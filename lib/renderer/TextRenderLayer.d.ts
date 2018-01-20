import { IColorSet, IRenderDimensions } from './Interfaces';
import { ITerminal } from '../Interfaces';
import { BaseRenderLayer } from './BaseRenderLayer';
export declare class TextRenderLayer extends BaseRenderLayer {
    private _state;
    private _characterWidth;
    private _characterFont;
    private _characterOverlapCache;
    constructor(container: HTMLElement, zIndex: number, colors: IColorSet);
    resize(terminal: ITerminal, dim: IRenderDimensions, charSizeChanged: boolean): void;
    reset(terminal: ITerminal): void;
    onGridChanged(terminal: ITerminal, startRow: number, endRow: number): void;
    private _isOverlapping(charData);
    private _clearChar(x, y);
}
