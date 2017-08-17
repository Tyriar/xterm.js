import { ITerminal, IBuffer } from './Interfaces';
import { CircularList } from './utils/CircularList';
import { LineData } from './Types';
export declare const CHAR_DATA_CHAR_INDEX = 1;
export declare const CHAR_DATA_WIDTH_INDEX = 2;
export declare class Buffer implements IBuffer {
    private _terminal;
    private _hasScrollback;
    private _lines;
    ydisp: number;
    ybase: number;
    y: number;
    x: number;
    scrollBottom: number;
    scrollTop: number;
    tabs: any;
    savedY: number;
    savedX: number;
    constructor(_terminal: ITerminal, _hasScrollback: boolean);
    readonly lines: CircularList<LineData>;
    private _getCorrectBufferLength(rows);
    fillViewportRows(): void;
    clear(): void;
    resize(newCols: number, newRows: number): void;
    translateBufferLineToString(lineIndex: number, trimRight: boolean, startCol?: number, endCol?: number): string;
}
