/**
 * Copyright (c) 2025 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { assert } from 'chai';
import { encodePathToBinary, binaryToBase64, base64ToBinary, BinaryPathOpcode } from './CustomGlyphBinaryFormat';

describe('CustomGlyphBinaryFormat', () => {
  describe('encodePathToBinary', () => {
    it('should encode M command', () => {
      const binary = encodePathToBinary('M0.5,0.5');
      assert.strictEqual(binary.length, 3);
      assert.strictEqual(binary[0], BinaryPathOpcode.M);
      assert.strictEqual(binary[1], 128);
      assert.strictEqual(binary[2], 128);
    });

    it('should encode L command', () => {
      const binary = encodePathToBinary('L1,0');
      assert.strictEqual(binary.length, 3);
      assert.strictEqual(binary[0], BinaryPathOpcode.L);
      assert.strictEqual(binary[1], 255);
      assert.strictEqual(binary[2], 0);
    });

    it('should encode H command', () => {
      const binary = encodePathToBinary('H0.25');
      assert.strictEqual(binary.length, 2);
      assert.strictEqual(binary[0], BinaryPathOpcode.H);
      assert.strictEqual(binary[1], 64);
    });

    it('should encode V command', () => {
      const binary = encodePathToBinary('V0.75');
      assert.strictEqual(binary.length, 2);
      assert.strictEqual(binary[0], BinaryPathOpcode.V);
      assert.strictEqual(binary[1], 191);
    });

    it('should encode Z command', () => {
      const binary = encodePathToBinary('Z');
      assert.strictEqual(binary.length, 1);
      assert.strictEqual(binary[0], BinaryPathOpcode.Z);
    });

    it('should encode Q command', () => {
      const binary = encodePathToBinary('Q0.5,0,1,0.5');
      assert.strictEqual(binary.length, 5);
      assert.strictEqual(binary[0], BinaryPathOpcode.Q);
      assert.strictEqual(binary[1], 128);
      assert.strictEqual(binary[2], 0);
      assert.strictEqual(binary[3], 255);
      assert.strictEqual(binary[4], 128);
    });

    it('should encode C command', () => {
      const binary = encodePathToBinary('C0,0,0.5,0.5,1,1');
      assert.strictEqual(binary.length, 7);
      assert.strictEqual(binary[0], BinaryPathOpcode.C);
    });

    it('should encode multiple commands', () => {
      const binary = encodePathToBinary('M0,0 L1,1 Z');
      assert.strictEqual(binary.length, 7);
      assert.strictEqual(binary[0], BinaryPathOpcode.M);
      assert.strictEqual(binary[3], BinaryPathOpcode.L);
      assert.strictEqual(binary[6], BinaryPathOpcode.Z);
    });
  });

  describe('base64 encoding/decoding', () => {
    it('should roundtrip binary data', () => {
      const original = new Uint8Array([0, 128, 255, 64, 191]);
      const base64 = binaryToBase64(original);
      const decoded = base64ToBinary(base64);
      assert.deepEqual(Array.from(decoded), Array.from(original));
    });

    it('should produce valid base64', () => {
      const binary = encodePathToBinary('M0,0 L1,1 Z');
      const base64 = binaryToBase64(binary);
      assert.match(base64, /^[A-Za-z0-9+/]*=*$/);
    });
  });

  describe('full pipeline', () => {
    it('should encode and decode simple path', () => {
      const path = 'M0,0 L1,0 L1,1 L0,1 Z';
      const binary = encodePathToBinary(path);
      const base64 = binaryToBase64(binary);
      const decoded = base64ToBinary(base64);
      assert.deepEqual(Array.from(decoded), Array.from(binary));
    });
  });
});
