import { ITerminal } from './Interfaces';
export declare class Renderer {
    private _terminal;
    private _refreshRowsQueue;
    private _refreshFramesSkipped;
    private _refreshAnimationFrame;
    private _spanElementObjectPool;
    constructor(_terminal: ITerminal);
    queueRefresh(start: number, end: number): void;
    private _refreshLoop();
    private _refresh(start, end);
    refreshSelection(start: [number, number], end: [number, number]): void;
    private _createSelectionElement(row, colStart, colEnd, rowCount?);
}
