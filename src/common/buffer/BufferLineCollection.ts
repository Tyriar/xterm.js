/**
 * Copyright (c) 2022 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { ArrayBufferList, IArrayBufferList } from 'common/buffer/ArrayBufferList';
import { CircularList, IDeleteEvent, IInsertEvent } from 'common/CircularList';
import { IEventEmitter, IEvent } from 'common/EventEmitter';
import { IBufferService } from 'common/services/Services';
import { IBufferLine, ICircularList } from 'common/Types';

const enum Constants {
  /** Typed array slots taken by one cell */
  CELL_SIZE = 3
}

/**
 * This is a wrapper around CircularList which hides its internals and knows how to assign and
 * manage `IBufferLine` shared buffer data in an IArrayBufferList.
 */
export class BufferLineCollection implements ICircularList<IBufferLine> {
  private _data: IArrayBufferList;
  private _lines: CircularList<IBufferLine>;

  public get length(): number { return this._lines.length; }
  public set length(value: number) {
    // TODO: Impl
    this._lines.length = value;
  }
  public get maxLength(): number { return this._lines.maxLength; }
  public set maxLength(value: number) {
    // TODO: Impl
    this._lines.maxLength;
  }
  public get isFull(): boolean { return this._lines.isFull; }

  public get onDeleteEmitter(): IEventEmitter<IDeleteEvent> { return this._lines.onDeleteEmitter; }
  public get onDelete(): IEvent<IDeleteEvent> { return this._lines.onDelete; }
  public get onInsertEmitter(): IEventEmitter<IInsertEvent> { return this._lines.onInsertEmitter; }
  public get onInsert(): IEvent<IInsertEvent> { return this._lines.onInsert; }
  public get onTrimEmitter(): IEventEmitter<number> { return this._lines.onTrimEmitter; }
  public get onTrim(): IEvent<number> { return this._lines.onTrim; }

  constructor(
    bufferLength: number,
    cols: number
  ) {
    this._data = new ArrayBufferList(cols * Constants.CELL_SIZE, bufferLength);
    this._lines = new CircularList<IBufferLine>(bufferLength);
  }

  public get(index: number): IBufferLine | undefined {
    return this._lines.get(index);
  }

  public set(index: number, value: IBufferLine): void {
    // TODO: Impl
    this._lines.set(index, value);
  }
  public push(value: IBufferLine): void {
    // TODO: Impl
    this._lines.push(value);
  }
  public recycle(): IBufferLine {
    return this._lines.recycle();
  }
  public pop(): IBufferLine | undefined {
    return this._lines.pop();
  }
  public splice(start: number, deleteCount: number, ...items: IBufferLine[]): void {
    return this._lines.splice(start, deleteCount, ...items);
  }
  public trimStart(count: number): void {
    this._lines.trimStart(count);
  }
  public shiftElements(start: number, count: number, offset: number): void {
    this._lines.shiftElements(start, count, offset);
  }
}
