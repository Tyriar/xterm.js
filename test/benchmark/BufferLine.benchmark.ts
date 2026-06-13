/**
 * Copyright (c) 2026 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { perfContext, before, RuntimeCase } from 'xterm-benchmark';
import { BufferLine } from '../../src/common/buffer/BufferLine';
import { BufferLineStringCache } from '../../src/common/buffer/BufferLineStringCache';
import { CellData } from '../../src/common/buffer/CellData';
import { ICellData } from '../../src/common/buffer/Types';
import { NULL_CELL_CHAR, NULL_CELL_CODE, NULL_CELL_WIDTH } from '../../src/common/buffer/Constants';

const COLS = 120;
const ITERATIONS = 2_000_000;
const stringCache = new BufferLineStringCache();

function nullCell(): ICellData {
  return CellData.fromCharData([0, NULL_CELL_CHAR, NULL_CELL_WIDTH, NULL_CELL_CODE]);
}

/** Pre-change copyFrom/fill map handling (allocates two new objects per call). */
class AllocMapsBufferLine extends BufferLine {
  public copyFromAllocMaps(line: AllocMapsBufferLine): void {
    (this as any)._invalidateStringCache();
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

  public fillAllocMaps(fillCellData: ICellData): void {
    (this as any)._invalidateStringCache();
    this._combined = {};
    this._extendedAttrs = {};
    for (let i = 0; i < this.length; ++i) {
      this.setCell(i, fillCellData);
    }
  }
}

function seedDirtyCombinedMaps(line: AllocMapsBufferLine, count: number): void {
  const cell = CellData.fromCharData([1, 'e\u0301', 1, '\u0301'.charCodeAt(0)]);
  for (let i = 0; i < count; i++) {
    line.setCell(i * 3 % line.length, cell);
  }
}

perfContext('BufferLine scroll-style recycle', () => {
  let dest: AllocMapsBufferLine;
  let blank: AllocMapsBufferLine;

  before(() => {
    blank = new AllocMapsBufferLine(stringCache, COLS, nullCell(), false);
    dest = new AllocMapsBufferLine(stringCache, COLS, nullCell(), false);
    seedDirtyCombinedMaps(dest, 20);
  });

  perfContext('copyFrom blank over dirty line (flags + in-place)', () => {
    new RuntimeCase('', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        dest.copyFrom(blank);
      }
      return { payloadSize: ITERATIONS };
    }, { fork: false }).showAverageRuntime();
  });

  perfContext('copyFrom blank over dirty line (alloc maps)', () => {
    new RuntimeCase('', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        dest.copyFromAllocMaps(blank);
      }
      return { payloadSize: ITERATIONS };
    }, { fork: false }).showAverageRuntime();
  });
});

perfContext('BufferLine fill', () => {
  let line: AllocMapsBufferLine;
  const fill = nullCell();

  before(() => {
    line = new AllocMapsBufferLine(stringCache, COLS, fill, false);
    seedDirtyCombinedMaps(line, 20);
  });

  perfContext('fill (in-place maps)', () => {
    new RuntimeCase('', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        line.fill(fill);
      }
      return { payloadSize: ITERATIONS };
    }, { fork: false }).showAverageRuntime();
  });

  perfContext('fill (alloc maps)', () => {
    new RuntimeCase('', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        line.fillAllocMaps(fill);
      }
      return { payloadSize: ITERATIONS };
    }, { fork: false }).showAverageRuntime();
  });
});
