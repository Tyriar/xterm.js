import { CharMeasure } from './CharMeasure';
export declare function getCoordsRelativeToElement(event: MouseEvent, element: HTMLElement): [number, number];
export declare function getCoords(event: MouseEvent, rowContainer: HTMLElement, charMeasure: CharMeasure, colCount: number, rowCount: number, isSelection?: boolean): [number, number];
export declare function getRawByteCoords(event: MouseEvent, rowContainer: HTMLElement, charMeasure: CharMeasure, colCount: number, rowCount: number): {
    x: number;
    y: number;
};
