import { IArrayBufferList } from 'common/buffer/ArrayBufferList';

export interface IBufferDataStore {
  readonly nextIndex: number;

  acquire(): Uint32Array;

  release(index: number): void;

  setCols(cols: number): void;
}

// export class BufferDataStore implements IBufferDataStore {
//   private readonly _data: IArrayBufferList;
//   // Tracks indexes that have been released
//   private readonly _releasedIndexes: number[] = [];

//   nextIndex: number;

//   constructor() {
//   }

//   acquire(): Uint32Array {
//     throw new Error('Method not implemented.');
//   }
//   release(index: number): void {
//     throw new Error('Method not implemented.');
//   }
//   setCols(cols: number): void {
//     throw new Error('Method not implemented.');
//   }
// }
