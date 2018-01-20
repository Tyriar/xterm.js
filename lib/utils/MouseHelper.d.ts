import { ICharMeasure } from '../Interfaces';
import { IRenderer } from '../renderer/Interfaces';
export declare class MouseHelper {
    private _renderer;
    constructor(_renderer: IRenderer);
    static getCoordsRelativeToElement(event: {
        pageX: number;
        pageY: number;
    }, element: HTMLElement): [number, number];
    getCoords(event: {
        pageX: number;
        pageY: number;
    }, element: HTMLElement, charMeasure: ICharMeasure, lineHeight: number, colCount: number, rowCount: number, isSelection?: boolean): [number, number];
    getRawByteCoords(event: MouseEvent, element: HTMLElement, charMeasure: ICharMeasure, lineHeight: number, colCount: number, rowCount: number): {
        x: number;
        y: number;
    };
}
