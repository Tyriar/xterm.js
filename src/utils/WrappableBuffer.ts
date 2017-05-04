/**
 * @license MIT
 */

import { ICircularList } from '../Interfaces';
import { CircularList } from './CircularList';
import { RowData, CharData } from '../Types';

export class WrappableBuffer implements ICircularList<RowData> {
  /**
   * The underlying list storing the data. This contains unwrapped row data
   * which is transformed by WrappableBuffer.
   */
  private _circularList: CircularList<RowData>;

  private _width: number;
  private _normalToWrappedIndex: number[];
  private _wrappedToNormalIndex: [number, number][];

  constructor(maxLength: number, width: number) {
    this._circularList = new CircularList<RowData>(maxLength);
    this._width = width;
    // this._normalToWrappedIndex = new Array(maxLength);
    // this._wrappedToNormalIndex = new Array(maxLength);
    this.resize(this._width);
  }

  public get length(): number {
    // TODO: Change length on resize
    return this._circularList.length;
  }

  public set length(newLength: number) {
    // TODO: Change length on resize
    this._circularList.length = newLength;
  }

  public get maxLength(): number {
    // TODO: Change maxLength on resize
    return this._circularList.maxLength;
  }

  public set maxLength(newMaxLength: number) {
    // TODO: Change maxLength on resize
    this._circularList.maxLength = newMaxLength;
  }

  public resize(width: number): void {
    // Lots of optimization potential here
    this._normalToWrappedIndex = new Array(this._circularList.length);
    this._wrappedToNormalIndex = new Array(this._circularList.length);
    let currentNormal = 0;
    let currentWrappedCount = 0;
    for (let i = 0; i < this._circularList.length; i++) {
      const line = this._circularList.get(i);
      const wrappedCount = Math.ceil(line.length / width);
      this._normalToWrappedIndex[i] = currentWrappedCount;
      for (let j = 0; j < wrappedCount; j++) {
        this._wrappedToNormalIndex[currentWrappedCount + j] = [i, j];
      }
      currentWrappedCount += wrappedCount;
    }
    this._width = width;
  }

  public forEach(callbackfn: (value: RowData, index: number, array: RowData[]) => void): void {
    // TODO: Revisit
    this._circularList.forEach(callbackfn);
  }

  public get(index: number): RowData {
    return this._circularList.get(index);
  }

  public getWrapped(index: number): RowData {
    const normalIndex = this._wrappedToNormalIndex[index];
    const row = this._circularList.get(normalIndex[0]);
    console.log(`getWrapped(${index}), normalIndex=${normalIndex}, width=${this._width}`);

    const startIndex = normalIndex[1] * this._width;
    const wrappedRow = row.slice(startIndex, startIndex + this._width);
    return wrappedRow;
  }

  public get wrappedLength(): number {
    return this._wrappedToNormalIndex.length;
  }

  public set(index: number, value: RowData): void {
    // TODO: Adjust wrapped state of relevant rows
    this._circularList.set(index, value);
  }

  public push(value: RowData): void {
    const normalIndex = this._circularList.length;
    const wrappedIndex = this._wrappedToNormalIndex.length;
    for (let i = 0; i < value.length / this._width; i++) {
      this._wrappedToNormalIndex.push([normalIndex, i]);
    }
    this._normalToWrappedIndex[normalIndex] = wrappedIndex;
    this._circularList.push(value);
  }

  public pop(): [number, string, number][] {
    // TODO: Revisit
    return this._circularList.pop();
  }

  public splice(start: number, deleteCount: number, ...items: RowData[]): void {
    // TODO: Revisit
    this._circularList.splice(start, deleteCount, ...items);
  }

  public trimStart(count: number): void {
    // TODO: Revisit
    this._circularList.trimStart(count);
  }

  public shiftElements(start: number, count: number, offset: number): void {
    // TODO: Revisit
    this._circularList.shiftElements(start, count, offset);
  }
}
