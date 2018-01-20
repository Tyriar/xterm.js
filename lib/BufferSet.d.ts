import { ITerminal, IBufferSet } from './Interfaces';
import { Buffer } from './Buffer';
import { EventEmitter } from './EventEmitter';
export declare class BufferSet extends EventEmitter implements IBufferSet {
    private _terminal;
    private _normal;
    private _alt;
    private _activeBuffer;
    constructor(_terminal: ITerminal);
    readonly alt: Buffer;
    readonly active: Buffer;
    readonly normal: Buffer;
    activateNormalBuffer(): void;
    activateAltBuffer(): void;
    resize(newCols: number, newRows: number): void;
    setupTabStops(i?: number): void;
}
