import { EventEmitter } from '../EventEmitter.js';
export declare class CharMeasure extends EventEmitter {
    private _document;
    private _parentElement;
    private _measureElement;
    private _width;
    private _height;
    constructor(document: Document, parentElement: HTMLElement);
    readonly width: number;
    readonly height: number;
    measure(): void;
    private _doMeasure();
}
