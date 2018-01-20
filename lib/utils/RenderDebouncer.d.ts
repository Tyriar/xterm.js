import { ITerminal, IDisposable } from '../Interfaces';
export declare class RenderDebouncer implements IDisposable {
    private _terminal;
    private _callback;
    private _rowStart;
    private _rowEnd;
    private _animationFrame;
    constructor(_terminal: ITerminal, _callback: (start: number, end: number) => void);
    dispose(): void;
    refresh(rowStart?: number, rowEnd?: number): void;
    private _innerRefresh();
}
