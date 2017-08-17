import { ITerminal, IViewport } from './Interfaces';
import { CharMeasure } from './utils/CharMeasure';
export declare class Viewport implements IViewport {
    private terminal;
    private viewportElement;
    private scrollArea;
    private charMeasure;
    private currentRowHeight;
    private lastRecordedBufferLength;
    private lastRecordedViewportHeight;
    private lastTouchY;
    constructor(terminal: ITerminal, viewportElement: HTMLElement, scrollArea: HTMLElement, charMeasure: CharMeasure);
    private refresh();
    syncScrollArea(): void;
    private onScroll(ev);
    onWheel(ev: WheelEvent): void;
    onTouchStart(ev: TouchEvent): void;
    onTouchMove(ev: TouchEvent): void;
}
