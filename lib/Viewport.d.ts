import { ITerminal, IViewport } from './Interfaces';
import { CharMeasure } from './utils/CharMeasure';
import { IColorSet } from './renderer/Interfaces';
export declare class Viewport implements IViewport {
    private terminal;
    private viewportElement;
    private scrollArea;
    private charMeasure;
    private currentRowHeight;
    private lastRecordedBufferLength;
    private lastRecordedViewportHeight;
    private lastRecordedBufferHeight;
    private lastTouchY;
    constructor(terminal: ITerminal, viewportElement: HTMLElement, scrollArea: HTMLElement, charMeasure: CharMeasure);
    onThemeChanged(colors: IColorSet): void;
    private refresh();
    syncScrollArea(): void;
    private onScroll(ev);
    onWheel(ev: WheelEvent): void;
    onTouchStart(ev: TouchEvent): void;
    onTouchMove(ev: TouchEvent): void;
}
