import { IColorSet, IColorManager } from './Interfaces';
import { ITheme } from '../Interfaces';
export declare const DEFAULT_ANSI_COLORS: string[];
export declare class ColorManager implements IColorManager {
    colors: IColorSet;
    constructor();
    setTheme(theme: ITheme): void;
    private _validateColor(color, fallback);
}
