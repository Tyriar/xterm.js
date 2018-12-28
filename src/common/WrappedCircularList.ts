/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { ICircularList } from './Types';
import { CircularList } from './CircularList';
import { IDisposable } from 'xterm';

/**
 * The ratio that when multiplied by maxLength which results in the expected maximum amount of
 * wrapped lines in a list. This is used to initially size _wrappedToNormalIndex.
 */
const WRAP_ARRAY_INITIAL_SIZE_RATIO = 1.5;

/**
 * The amount to grow the _wrappedToNormalIndex array when the capacity is hit.
 */
const WRAP_ARRAY_GROW_RATIO = 1.2;

export class WrappedCircularList<T> implements ICircularList<T> {
  private _unwrapped: CircularList<T>;

  private _wrappedToNormalIndex: Uint16Array;
  private _normalToWrappedIndex: Uint16Array;

  constructor(maxLength: number) {
    this._unwrapped = new CircularList(maxLength);
    this._normalToWrappedIndex = new Uint16Array(maxLength);
    this._wrappedToNormalIndex = new Uint16Array(Math.ceil(maxLength * WRAP_ARRAY_INITIAL_SIZE_RATIO));
  }

  public get length(): number {
    return this._unwrapped.length;
  }
  public set length(value: number) {
    this._unwrapped.length = value;
  }
  public get maxLength(): number {
    return this._unwrapped.maxLength;
  }
  public set maxLength(value: number) {
    this._unwrapped.maxLength = value;
  }
  public get(index: number): T {
    // TODO: Fix for wrapped
    return this._unwrapped.get(index);
  }
  public set(index: number, value: T): void {
    // TODO: Fix for wrapped
    this._unwrapped.set(index, value);
  }
  public push(value: T): void {
    // TODO: Fix for wrapped
    this._unwrapped.push(value)
  }
  public pop(): T {
    // TODO: Fix for wrapped
    return this._unwrapped.pop();
  }
  public splice(start: number, deleteCount: number, ...items: T[]): void {
    // TODO: Fix for wrapped
    this._unwrapped.splice(start, deleteCount, ...items);
  }
  public trimStart(count: number): void {
    // TODO: Fix for wrapped
    this._unwrapped.trimStart(count);
  }
  public shiftElements(start: number, count: number, offset: number): void {
    // TODO: Fix for wrapped
    this._unwrapped.shiftElements(start, count, offset);
  }
  public on(type: string, listener: (...args: any[]) => void): void {
    // TODO: Fix for wrapped
    this._unwrapped.on(type, listener);
  }
  public off(type: string, listener: (...args: any[]) => void): void {
    // TODO: Fix for wrapped
    this._unwrapped.off(type, listener);
  }
  public emit(type: string, data?: any): void {
    // TODO: Fix for wrapped
    this._unwrapped.emit(type, data);
  }
  public addDisposableListener(type: string, handler: (...args: any[]) => void): IDisposable {
    // TODO: Fix for wrapped
    return this._unwrapped.addDisposableListener(type, handler);
  }
}
