/**
 * Copyright (c) 2022 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { ArrayBufferList } from 'common/buffer/ArrayBufferList';
import { assert } from 'chai';

const {
  deepStrictEqual,
  notStrictEqual,
  strictEqual
} = assert;

declare const global: any;

describe('ArrayBufferList', () => {
  // Monkeypatch setTimeout out to waiting for the gc call to finish the tests
  let originalSetTimeout: unknown;
  before(() => {
    originalSetTimeout = global.setTimeout;
    global.setTimeout = () => {};
  });
  after(() => global.setTimeout = originalSetTimeout);

  it('should create items and persist data', () => {
    const a = new ArrayBufferList(2 * 4, 3);
    const inner1 = a.createUint32ItemView(0);
    const inner2 = a.createUint32ItemView(1);
    const inner3 = a.createUint32ItemView(2);
    inner1[0] = 1;
    inner1[1] = 2;
    inner2[0] = 3;
    inner2[1] = 4;
    inner3[0] = 5;
    inner3[1] = 6;
    deepStrictEqual(Array.from(a.createUint32ItemView(0)), [1, 2]);
    deepStrictEqual(Array.from(a.createUint32ItemView(1)), [3, 4]);
    deepStrictEqual(Array.from(a.createUint32ItemView(2)), [5, 6]);
  });
  describe('resize', () => {
    it('should retain data when reducing the size', () => {
      const a = new ArrayBufferList(2 * 4, 1);
      const inner1 = a.createUint32ItemView(0);
      inner1[0] = 1;
      inner1[1] = 2;
      a.itemSize = 1 * 4;
      deepStrictEqual(Array.from(a.createUint32ItemView(0)), [1]);
    });
    it('should increase size', () => {
      const a = new ArrayBufferList(1 * 4, 1);
      const inner1 = a.createUint32ItemView(0);
      strictEqual(inner1.length, 1);
      inner1[0] = 1;
      a.itemSize = 2 * 4;
      deepStrictEqual(Array.from(a.createUint32ItemView(0)), [1, 0]);
    });
    it('should fire onArrayBufferChange on size increase', async () => {
      const a = new ArrayBufferList(1 * 4, 1);
      const inner1 = a.createUint32ItemView(0);
      inner1[0] = 1;
      await new Promise<void>(r => {
        a.onArrayBufferChange(r);
        a.itemSize = 2 * 4;
      });
      const inner2 = a.createUint32ItemView(0);
      strictEqual(inner1[0], inner2[0]);
      inner2[0] = 2;
      notStrictEqual(inner1[0], inner2[0], 'The old typed array should point at a different ArrayBuffer');
    });
  });
});
