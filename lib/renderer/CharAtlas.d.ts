import { ITerminal } from '../Interfaces';
import { IColorSet } from '../renderer/Interfaces';
export declare const CHAR_ATLAS_CELL_SPACING = 1;
export declare function acquireCharAtlas(terminal: ITerminal, colors: IColorSet, scaledCharWidth: number, scaledCharHeight: number): HTMLCanvasElement | Promise<ImageBitmap>;
export declare function initialize(document: Document): void;
