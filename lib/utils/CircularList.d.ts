import { EventEmitter } from '../EventEmitter';
import { ICircularList } from '../Interfaces';
export declare class CircularList<T> extends EventEmitter implements ICircularList<T> {
    private _maxLength;
    protected _array: T[];
    private _startIndex;
    private _length;
    constructor(_maxLength: number);
    maxLength: number;
    length: number;
    readonly forEach: (callbackfn: (value: T, index: number) => void) => void;
    get(index: number): T;
    set(index: number, value: T): void;
    push(value: T): void;
    pop(): T;
    splice(start: number, deleteCount: number, ...items: T[]): void;
    trimStart(count: number): void;
    shiftElements(start: number, count: number, offset: number): void;
    private _getCyclicIndex(index);
}
