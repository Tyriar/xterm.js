import { EventEmitter } from '../EventEmitter';
import { ICharMeasure, ITerminalOptions } from '../Interfaces';
export declare class CharMeasure extends EventEmitter implements ICharMeasure {
    private _document;
    private _parentElement;
    private _measureElement;
    private _width;
    private _height;
    constructor(document: Document, parentElement: HTMLElement);
    readonly width: number;
    readonly height: number;
    measure(options: ITerminalOptions): void;
}
