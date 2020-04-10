/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */

export class GridCache<T> {
  cache: (T | undefined)[][];

  constructor() {
    this.cache = [];
  }

  resize(width: number, height: number): void {
    for (let x = 0; x < width; x++) {
      if (this.cache.length <= x) {
        this.cache.push([]);
      }
      for (let y = this.cache[x].length; y < height; y++) {
        this.cache[x].push(undefined);
      }
      this.cache[x].length = height;
    }
    this.cache.length = width;
  }

  clear(): void {
    for (let x = 0; x < this.cache.length; x++) {
      for (let y = 0; y < this.cache[x].length; y++) {
        this.cache[x][y] = undefined;
      }
    }
  }
}
