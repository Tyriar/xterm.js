import { IColorSet, IRenderDimensions } from './Interfaces';
import { ITerminal } from '../Interfaces';
import { BaseRenderLayer } from './BaseRenderLayer';
export declare class CursorRenderLayer extends BaseRenderLayer {
    private _state;
    private _cursorRenderers;
    private _cursorBlinkStateManager;
    private _isFocused;
    constructor(container: HTMLElement, zIndex: number, colors: IColorSet);
    resize(terminal: ITerminal, dim: IRenderDimensions, charSizeChanged: boolean): void;
    reset(terminal: ITerminal): void;
    onBlur(terminal: ITerminal): void;
    onFocus(terminal: ITerminal): void;
    onOptionsChanged(terminal: ITerminal): void;
    onCursorMove(terminal: ITerminal): void;
    onGridChanged(terminal: ITerminal, startRow: number, endRow: number): void;
    private _render(terminal, triggeredByAnimationFrame);
    private _clearCursor();
    private _renderBarCursor(terminal, x, y, charData);
    private _renderBlockCursor(terminal, x, y, charData);
    private _renderUnderlineCursor(terminal, x, y, charData);
    private _renderBlurCursor(terminal, x, y, charData);
}
