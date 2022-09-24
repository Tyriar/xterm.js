/**
 * Copyright (c) 2022 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { EventEmitter, IEvent } from 'common/EventEmitter';

export interface IArrayBufferList {
  /**
   * An event that fires when the backing ArrayBuffer changes, when this occurs all item views are
   * stale and must be re-created.
   */
  readonly onArrayBufferChange: IEvent<void>;

  /**
   * Change the number of items in the list, discarding any data in them
   */
  itemCount: number;

  /**
   * Change the byte size of items in the list. When this is reduced the data at the end of the item
   * will be discarded and when increased it may have junk data in the new section. New item views
   * should be created when this is called.
   */
  itemSize: number;

  /**
   * Creates a view of an item in the list.
   */
  createUint32ItemView(index: number): Uint32Array;
}

/**
 * An object that encapsulates creating a 2-dimensional array (ie. a list of ArrayBuffers), with
 * fixed width and height. This is used for high memory efficiency to minimize allocations and other
 * work when resizing occurs.
 */
export class ArrayBufferList implements IArrayBufferList {
  private _data: ArrayBuffer;
  private _actualItemSize: number;
  private _virtualItemSize: number;
  private _actualItemCount: number;
  private _virtualItemCount: number;

  private _onArrayBufferChange = new EventEmitter<void>();
  public readonly onArrayBufferChange = this._onArrayBufferChange.event;

  constructor(itemSize: number, itemCount: number) {
    this._actualItemSize = itemSize;
    this._virtualItemSize = itemSize;
    this._actualItemCount = itemCount;
    this._virtualItemCount = itemCount;
    this._data = new ArrayBuffer(itemSize * itemCount);
  }

  public get itemCount(): number { return this._virtualItemCount; }
  public set itemCount(newCount: number) {
    // Equal, no-op
    if (newCount === this._actualItemSize) {
      return;
    }

    // Less than, only the virtual size changes
    if (newCount < this._actualItemSize) {
      this._virtualItemSize = newCount;
      this._gc();
      return;
    }

    // Greater than, the ArrayBuffer needs to be recreated
    this._rebuildBuffer(this._virtualItemSize, newCount);
  }

  public get itemSize(): number { return this._virtualItemSize; }
  public set itemSize(newSize: number) {
    // Equal, no-op
    if (newSize === this._actualItemSize) {
      return;
    }

    // Less than, only the virtual size changes
    if (newSize < this._actualItemSize) {
      this._virtualItemSize = newSize;
      this._gc();
      return;
    }

    // Greater than, the ArrayBuffer needs to be recreated
    this._rebuildBuffer(newSize);
  }

  public createUint32ItemView(index: number): Uint32Array {
    if (index < 0 || index >= this._virtualItemCount) {
      throw new Error('Index out of range');
    }
    return new Uint32Array(this._data, index * this._actualItemSize, this._virtualItemSize / 4);
  }

  private _rebuildBuffer(newItemSize: number = this._virtualItemSize, newItemCount: number = this._virtualItemCount): void {
    // Actual matches, no-op
    if (newItemSize === this._actualItemSize && newItemCount === this._actualItemCount) {
      return;
    }

    // Create new ArrayBuffer and migrate data
    const oldData = new Uint8Array(this._data);
    const newData = new Uint8Array(newItemSize * newItemCount);
    for (let i = 0; i < this._actualItemCount; i++) {
      newData.set(oldData.subarray(i * this._actualItemSize, i * this._actualItemSize + this._virtualItemSize), i * newItemSize);
    }

    // Set the new values
    this._actualItemSize = newItemSize;
    this._virtualItemSize = newItemSize;
    this._actualItemCount = newItemCount;
    this._virtualItemCount = newItemCount;
    this._data = newData.buffer;

    // Fire event and clean up
    this._onArrayBufferChange.fire();
    this._cancelGc();
  }

  private _gcTimeout?: any;
  private _gc(): void {
    this._cancelGc();
    this._gcTimeout = setTimeout(() => {
      this._gcTimeout = undefined;
      // Don't track this callback as the debouncing will prevent it from being called twice
      requestIdleCallback(() => this._rebuildBuffer());
    }, 10000);
  }

  private _cancelGc(): void {
    if (this._gcTimeout) {
      clearTimeout(this._gcTimeout);
    }
  }
}
