/**
 * Copyright (c) 2025 The xterm.js authors. All rights reserved.
 * @license MIT
 *
 * Binary format for custom glyph path data.
 *
 * Format: base64-encoded binary where:
 * - Byte 0: opcode (0=M, 1=L, 2=H, 3=V, 4=C, 5=Q, 6=T, 7=A, 8=Z, 9=setFill, 10=setStroke)
 * - Following bytes: 8-bit coordinates (0-255 maps to 0.0-1.0)
 *
 * Coordinate counts per opcode:
 * - M, L, T: 2 coords (x, y)
 * - H, V: 1 coord
 * - Q: 4 coords (cpx, cpy, x, y)
 * - C: 6 coords (cp1x, cp1y, cp2x, cp2y, x, y)
 * - A: 7 values (rx, ry, rotation, largeArc, sweep, x, y) - flags as 0/1
 * - Z: 0 coords
 * - setFill/setStroke: 0 coords (toggles active path type)
 */

export const enum BinaryPathOpcode {
  M = 0,
  L = 1,
  H = 2,
  V = 3,
  C = 4,
  Q = 5,
  T = 6,
  A = 7,
  Z = 8,
  SET_FILL = 9,
  SET_STROKE = 10
}

const COORD_COUNTS: Record<BinaryPathOpcode, number> = {
  [BinaryPathOpcode.M]: 2,
  [BinaryPathOpcode.L]: 2,
  [BinaryPathOpcode.H]: 1,
  [BinaryPathOpcode.V]: 1,
  [BinaryPathOpcode.C]: 6,
  [BinaryPathOpcode.Q]: 4,
  [BinaryPathOpcode.T]: 2,
  [BinaryPathOpcode.A]: 7,
  [BinaryPathOpcode.Z]: 0,
  [BinaryPathOpcode.SET_FILL]: 0,
  [BinaryPathOpcode.SET_STROKE]: 0
};

const OPCODE_FROM_CHAR: Record<string, BinaryPathOpcode> = {
  'M': BinaryPathOpcode.M,
  'L': BinaryPathOpcode.L,
  'H': BinaryPathOpcode.H,
  'V': BinaryPathOpcode.V,
  'C': BinaryPathOpcode.C,
  'Q': BinaryPathOpcode.Q,
  'T': BinaryPathOpcode.T,
  'A': BinaryPathOpcode.A,
  'Z': BinaryPathOpcode.Z
};

/**
 * Encode a normalized coordinate (0-1) to a single byte (0-255).
 */
function encodeByte(value: number): number {
  return Math.round(Math.max(0, Math.min(1, value)) * 255);
}

/**
 * Decode a byte (0-255) to a normalized coordinate (0-1).
 */
function decodeByte(byte: number): number {
  return byte / 255;
}

/**
 * Encode an SVG-like path string to binary format.
 */
export function encodePathToBinary(pathString: string): Uint8Array {
  const instructions = pathString.split(' ').filter(s => s.length > 0);
  const bytes: number[] = [];

  for (const instruction of instructions) {
    const opChar = instruction[0];
    const opcode = OPCODE_FROM_CHAR[opChar];
    if (opcode === undefined) {
      throw new Error(`Unknown path instruction: ${instruction}`);
    }

    bytes.push(opcode);

    if (opcode === BinaryPathOpcode.Z) {
      continue;
    }

    const argsStr = instruction.slice(1);
    if (argsStr.length === 0) {
      continue;
    }

    const args = argsStr.split(',').map(s => parseFloat(s));
    const expectedCount = COORD_COUNTS[opcode];
    if (args.length !== expectedCount) {
      throw new Error(`Expected ${expectedCount} args for ${opChar}, got ${args.length}: ${instruction}`);
    }

    for (const arg of args) {
      bytes.push(encodeByte(arg));
    }
  }

  return new Uint8Array(bytes);
}

/**
 * Encode binary data to base64 string.
 */
export function binaryToBase64(data: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i]);
  }
  return btoa(binary);
}

/**
 * Decode base64 string to binary data.
 */
export function base64ToBinary(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Execute binary path data directly on a canvas context.
 */
export function executeBinaryPath(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  data: Uint8Array,
  xOffset: number,
  yOffset: number,
  cellWidth: number,
  cellHeight: number
): void {
  let i = 0;
  let lastX = 0;
  let lastY = 0;
  let lastCpX = 0;
  let lastCpY = 0;

  while (i < data.length) {
    const opcode = data[i++] as BinaryPathOpcode;

    switch (opcode) {
      case BinaryPathOpcode.M: {
        const x = decodeByte(data[i++]);
        const y = decodeByte(data[i++]);
        lastX = x;
        lastY = y;
        ctx.moveTo(xOffset + x * cellWidth, yOffset + y * cellHeight);
        break;
      }
      case BinaryPathOpcode.L: {
        const x = decodeByte(data[i++]);
        const y = decodeByte(data[i++]);
        lastX = x;
        lastY = y;
        ctx.lineTo(xOffset + x * cellWidth, yOffset + y * cellHeight);
        break;
      }
      case BinaryPathOpcode.H: {
        const x = decodeByte(data[i++]);
        lastX = x;
        ctx.lineTo(xOffset + x * cellWidth, yOffset + lastY * cellHeight);
        break;
      }
      case BinaryPathOpcode.V: {
        const y = decodeByte(data[i++]);
        lastY = y;
        ctx.lineTo(xOffset + lastX * cellWidth, yOffset + y * cellHeight);
        break;
      }
      case BinaryPathOpcode.C: {
        const cp1x = decodeByte(data[i++]);
        const cp1y = decodeByte(data[i++]);
        const cp2x = decodeByte(data[i++]);
        const cp2y = decodeByte(data[i++]);
        const x = decodeByte(data[i++]);
        const y = decodeByte(data[i++]);
        lastCpX = cp2x;
        lastCpY = cp2y;
        lastX = x;
        lastY = y;
        ctx.bezierCurveTo(
          xOffset + cp1x * cellWidth, yOffset + cp1y * cellHeight,
          xOffset + cp2x * cellWidth, yOffset + cp2y * cellHeight,
          xOffset + x * cellWidth, yOffset + y * cellHeight
        );
        break;
      }
      case BinaryPathOpcode.Q: {
        const cpx = decodeByte(data[i++]);
        const cpy = decodeByte(data[i++]);
        const x = decodeByte(data[i++]);
        const y = decodeByte(data[i++]);
        lastCpX = cpx;
        lastCpY = cpy;
        lastX = x;
        lastY = y;
        ctx.quadraticCurveTo(
          xOffset + cpx * cellWidth, yOffset + cpy * cellHeight,
          xOffset + x * cellWidth, yOffset + y * cellHeight
        );
        break;
      }
      case BinaryPathOpcode.T: {
        const x = decodeByte(data[i++]);
        const y = decodeByte(data[i++]);
        // Reflect last control point
        const cpx = 2 * lastX - lastCpX;
        const cpy = 2 * lastY - lastCpY;
        lastCpX = cpx;
        lastCpY = cpy;
        lastX = x;
        lastY = y;
        ctx.quadraticCurveTo(
          xOffset + cpx * cellWidth, yOffset + cpy * cellHeight,
          xOffset + x * cellWidth, yOffset + y * cellHeight
        );
        break;
      }
      case BinaryPathOpcode.A: {
        // Arc approximation using bezier curves
        const rx = decodeByte(data[i++]) * cellWidth;
        const ry = decodeByte(data[i++]) * cellHeight;
        const _rotation = decodeByte(data[i++]); // Currently unused
        const largeArc = data[i++];
        const sweep = data[i++];
        const x = decodeByte(data[i++]);
        const y = decodeByte(data[i++]);
        const endX = xOffset + x * cellWidth;
        const endY = yOffset + y * cellHeight;
        const startX = xOffset + lastX * cellWidth;
        const startY = yOffset + lastY * cellHeight;
        drawArcAsBezier(ctx, startX, startY, rx, ry, largeArc === 1, sweep === 1, endX, endY);
        lastX = x;
        lastY = y;
        break;
      }
      case BinaryPathOpcode.Z: {
        ctx.closePath();
        break;
      }
    }
  }
}

/**
 * Approximate an SVG arc with bezier curves.
 */
function drawArcAsBezier(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  x1: number, y1: number,
  rx: number, ry: number,
  largeArc: boolean, sweep: boolean,
  x2: number, y2: number
): void {
  // Handle degenerate cases
  if (rx === 0 || ry === 0) {
    ctx.lineTo(x2, y2);
    return;
  }

  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;

  // Ensure radii are large enough
  const d = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
  if (d > 1) {
    const scale = Math.sqrt(d);
    rx *= scale;
    ry *= scale;
  }

  // Compute center
  const rxSq = rx * rx;
  const rySq = ry * ry;
  const dxSq = dx * dx;
  const dySq = dy * dy;

  let sq = (rxSq * rySq - rxSq * dySq - rySq * dxSq) / (rxSq * dySq + rySq * dxSq);
  if (sq < 0) sq = 0;
  const coef = (largeArc !== sweep ? 1 : -1) * Math.sqrt(sq);

  const cx1 = coef * (rx * dy) / ry;
  const cy1 = coef * -(ry * dx) / rx;

  const cx = cx1 + (x1 + x2) / 2;
  const cy = cy1 + (y1 + y2) / 2;

  // Compute angles
  const ux = (dx - cx1) / rx;
  const uy = (dy - cy1) / ry;
  const vx = (-dx - cx1) / rx;
  const vy = (-dy - cy1) / ry;

  let startAngle = Math.atan2(uy, ux);
  let extent = Math.atan2(vy, vx) - startAngle;

  if (!sweep && extent > 0) {
    extent -= 2 * Math.PI;
  } else if (sweep && extent < 0) {
    extent += 2 * Math.PI;
  }

  // Draw arc using canvas ellipse
  ctx.ellipse(cx, cy, rx, ry, 0, startAngle, startAngle + extent, !sweep);
}
