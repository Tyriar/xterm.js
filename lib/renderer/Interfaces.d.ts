import { ITerminal, ITheme, IEventEmitter } from '../Interfaces';
export interface IRenderer extends IEventEmitter {
    dimensions: IRenderDimensions;
    colorManager: IColorManager;
    setTheme(theme: ITheme): IColorSet;
    onWindowResize(devicePixelRatio: number): void;
    onResize(cols: number, rows: number, didCharSizeChange: boolean): void;
    onCharSizeChanged(): void;
    onBlur(): void;
    onFocus(): void;
    onSelectionChanged(start: [number, number], end: [number, number]): void;
    onCursorMove(): void;
    onOptionsChanged(): void;
    clear(): void;
    refreshRows(start: number, end: number): void;
}
export interface IRenderLayer {
    onBlur(terminal: ITerminal): void;
    onFocus(terminal: ITerminal): void;
    onCursorMove(terminal: ITerminal): void;
    onOptionsChanged(terminal: ITerminal): void;
    onThemeChanged(terminal: ITerminal, colorSet: IColorSet): void;
    onGridChanged(terminal: ITerminal, startRow: number, endRow: number): void;
    onSelectionChanged(terminal: ITerminal, start: [number, number], end: [number, number]): void;
    resize(terminal: ITerminal, dim: IRenderDimensions, charSizeChanged: boolean): void;
    reset(terminal: ITerminal): void;
}
export interface IColorManager {
    colors: IColorSet;
}
export interface IColorSet {
    foreground: string;
    background: string;
    cursor: string;
    cursorAccent: string;
    selection: string;
    ansi: string[];
}
export interface IRenderDimensions {
    scaledCharWidth: number;
    scaledCharHeight: number;
    scaledCellWidth: number;
    scaledCellHeight: number;
    scaledCharLeft: number;
    scaledCharTop: number;
    scaledCanvasWidth: number;
    scaledCanvasHeight: number;
    canvasWidth: number;
    canvasHeight: number;
    actualCellWidth: number;
    actualCellHeight: number;
}
