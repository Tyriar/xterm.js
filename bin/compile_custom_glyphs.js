#!/usr/bin/env node
/**
 * Copyright (c) 2025 The xterm.js authors. All rights reserved.
 * @license MIT
 *
 * Compiles custom glyph path strings to binary format.
 * Usage: node bin/compile_custom_glyphs.js
 *
 * This reads CustomGlyphDefinitions.ts, finds all PATH type definitions,
 * compiles them to base64 binary, and outputs the updated file.
 */

const fs = require('fs');
const path = require('path');

const COORD_COUNTS = {
  'M': 2, 'L': 2, 'H': 1, 'V': 1, 'C': 6, 'Q': 4, 'T': 2, 'A': 7, 'Z': 0
};

const OPCODE_FROM_CHAR = {
  'M': 0, 'L': 1, 'H': 2, 'V': 3, 'C': 4, 'Q': 5, 'T': 6, 'A': 7, 'Z': 8
};

function encodeByte(value) {
  return Math.round(Math.max(0, Math.min(1, value)) * 255);
}

function encodePathToBinary(pathString) {
  const instructions = pathString.split(' ').filter(s => s.length > 0);
  const bytes = [];

  for (const instruction of instructions) {
    const opChar = instruction[0];
    const opcode = OPCODE_FROM_CHAR[opChar];
    if (opcode === undefined) {
      throw new Error(`Unknown path instruction: ${instruction}`);
    }

    bytes.push(opcode);

    if (opcode === OPCODE_FROM_CHAR['Z']) {
      continue;
    }

    const argsStr = instruction.slice(1);
    if (argsStr.length === 0) {
      continue;
    }

    const args = argsStr.split(',').map(s => parseFloat(s));
    const expectedCount = COORD_COUNTS[opChar];
    if (args.length !== expectedCount) {
      throw new Error(`Expected ${expectedCount} args for ${opChar}, got ${args.length}: ${instruction}`);
    }

    for (const arg of args) {
      bytes.push(encodeByte(arg));
    }
  }

  return Buffer.from(bytes);
}

function binaryToBase64(buffer) {
  return buffer.toString('base64');
}

function compilePathString(pathString) {
  const binary = encodePathToBinary(pathString);
  return binaryToBase64(binary);
}

// Read the definitions file
const defsPath = path.join(__dirname, '../addons/addon-webgl/src/customGlyphs/CustomGlyphDefinitions.ts');
let content = fs.readFileSync(defsPath, 'utf8');

// Match: type: CustomGlyphDefinitionType.PATH, data: '...'
// Replace with: type: CustomGlyphDefinitionType.PATH_BINARY, data: '<base64>'
const pathRegex = /type: CustomGlyphDefinitionType\.PATH, data: '([^']+)'/g;

let match;
let replacements = [];
let totalOriginalSize = 0;
let totalBinarySize = 0;

while ((match = pathRegex.exec(content)) !== null) {
  const pathString = match[1];
  totalOriginalSize += pathString.length;

  try {
    const base64 = compilePathString(pathString);
    totalBinarySize += base64.length;
    replacements.push({
      original: match[0],
      replacement: `type: CustomGlyphDefinitionType.PATH_BINARY, data: '${base64}'`
    });
  } catch (e) {
    console.error(`Failed to compile path: ${e.message}`);
    console.error(`Path: ${pathString.substring(0, 100)}...`);
  }
}

// Apply replacements (in reverse order to preserve indices)
for (const { original, replacement } of replacements) {
  content = content.replace(original, replacement);
}

// Write back
fs.writeFileSync(defsPath, content);

console.log(`Compiled ${replacements.length} paths`);
console.log(`Original size: ${totalOriginalSize} chars`);
console.log(`Binary size: ${totalBinarySize} chars`);
console.log(`Compression: ${((1 - totalBinarySize / totalOriginalSize) * 100).toFixed(1)}%`);
