import { IColorSet, IRenderDimensions } from './Interfaces';
import { ITerminal } from '../Interfaces';
import { BaseRenderLayer } from './BaseRenderLayer';
export declare class SelectionRenderLayer extends BaseRenderLayer {
    private _state;
    constructor(container: HTMLElement, zIndex: number, colors: IColorSet);
    resize(terminal: ITerminal, dim: IRenderDimensions, charSizeChanged: boolean): void;
    reset(terminal: ITerminal): void;
    onSelectionChanged(terminal: ITerminal, start: [number, number], end: [number, number]): void;
}
