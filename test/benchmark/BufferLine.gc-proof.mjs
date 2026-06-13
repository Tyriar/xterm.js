/**
 * Run: node --expose-gc test/benchmark/BufferLine.gc-proof.mjs
 * Compares heap growth and GC pauses for in-place vs alloc-map copyFrom (scroll hot path).
 */
import { createRequire } from 'module';
import { PerformanceObserver } from 'node:perf_hooks';

const require = createRequire(import.meta.url);
const { BufferLine } = require('../../out/common/buffer/BufferLine.js');
const { BufferLineStringCache } = require('../../out/common/buffer/BufferLineStringCache.js');
const { CellData } = require('../../out/common/buffer/CellData.js');
const { NULL_CELL_CHAR, NULL_CELL_CODE, NULL_CELL_WIDTH } = require('../../out/common/buffer/Constants.js');

const COLS = 120;
const ROUNDS = 20;
const PER_ROUND = 500_000;

const stringCache = new BufferLineStringCache();

function nullCell() {
  return CellData.fromCharData([0, NULL_CELL_CHAR, NULL_CELL_WIDTH, NULL_CELL_CODE]);
}

class AllocMapsBufferLine extends BufferLine {
  copyFromAllocMaps(line) {
    this._invalidateStringCache();
    if (this.length !== line.length) {
      this._data = new Uint32Array(line._data);
    } else {
      this._data.set(line._data);
    }
    this.length = line.length;
    this._combined = {};
    for (const el in line._combined) {
      this._combined[el] = line._combined[el];
    }
    this._extendedAttrs = {};
    for (const el in line._extendedAttrs) {
      this._extendedAttrs[el] = line._extendedAttrs[el];
    }
    this.isWrapped = line.isWrapped;
  }
}

function seedDirty(line) {
  const cell = CellData.fromCharData([1, 'e\u0301', 1, '\u0301'.charCodeAt(0)]);
  for (let i = 0; i < 20; i++) {
    line.setCell((i * 3) % line.length, cell);
  }
}

function measure(label, fn) {
  let gcCount = 0;
  let gcMs = 0;
  const obs = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      gcCount++;
      gcMs += entry.duration;
    }
  });
  obs.observe({ entryTypes: ['gc'] });

  global.gc();
  const heapBefore = process.memoryUsage().heapUsed;
  const t0 = performance.now();
  fn();
  const ms = performance.now() - t0;
  const heapNoGc = process.memoryUsage().heapUsed;
  obs.disconnect();
  global.gc();
  const heapAfterGc = process.memoryUsage().heapUsed;
  const wallMinusGc = ms - gcMs;
  console.log(`${label}:`);
  console.log(`  wall time: ${ms.toFixed(1)} ms (${(PER_ROUND * ROUNDS / (ms / 1000) / 1e6).toFixed(2)}M ops/s)`);
  console.log(`  GC events: ${gcCount}, GC pause time: ${gcMs.toFixed(1)} ms (${((gcMs / ms) * 100).toFixed(1)}% of wall)`);
  console.log(`  wall minus GC pauses: ${wallMinusGc.toFixed(1)} ms (${(PER_ROUND * ROUNDS / (wallMinusGc / 1000) / 1e6).toFixed(2)}M ops/s)`);
  console.log(`  heap growth (no gc during run): ${((heapNoGc - heapBefore) / (1024 * 1024)).toFixed(1)} MiB`);
  console.log(`  heap retained (after gc): ${((heapAfterGc - heapBefore) / (1024 * 1024)).toFixed(2)} MiB`);
}

const blank = new BufferLine(stringCache, COLS, nullCell(), false);

if (!global.gc) {
  console.error('Re-run with: node --expose-gc test/benchmark/BufferLine.gc-proof.mjs');
  process.exit(1);
}

  console.log(`cols=${COLS}, ${ROUNDS} x ${PER_ROUND} copyFrom(blank) — dirty dest once, then steady-state blank\n`);

measure('in-place maps + dirty flags (current)', () => {
  const dest = new BufferLine(stringCache, COLS, nullCell(), false);
  seedDirty(dest);
  for (let r = 0; r < ROUNDS; r++) {
    for (let i = 0; i < PER_ROUND; i++) {
      dest.copyFrom(blank);
    }
  }
});

measure('alloc maps (previous)', () => {
  const dest = new AllocMapsBufferLine(stringCache, COLS, nullCell(), false);
  seedDirty(dest);
  for (let r = 0; r < ROUNDS; r++) {
    for (let i = 0; i < PER_ROUND; i++) {
      dest.copyFromAllocMaps(blank);
    }
  }
});
