import { IColorSet, IRenderDimensions } from './Interfaces';
import { ITerminal, ILinkifierAccessor } from '../Interfaces';
import { BaseRenderLayer } from './BaseRenderLayer';
export declare class LinkRenderLayer extends BaseRenderLayer {
    private _state;
    constructor(container: HTMLElement, zIndex: number, colors: IColorSet, terminal: ILinkifierAccessor);
    resize(terminal: ITerminal, dim: IRenderDimensions, charSizeChanged: boolean): void;
    reset(terminal: ITerminal): void;
    private _clearCurrentLink();
    private _onLinkHover(e);
    private _onLinkLeave(e);
}
