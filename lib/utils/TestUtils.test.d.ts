import { ITerminal, IBuffer, IBufferSet, IBrowser, ICharMeasure, ISelectionManager, ITerminalOptions, IListenerType, IInputHandlingTerminal, IViewport, ICircularList, ICompositionHelper } from '../Interfaces';
import { LineData } from '../Types';
export declare class MockTerminal implements ITerminal {
    options: ITerminalOptions;
    element: HTMLElement;
    rowContainer: HTMLElement;
    selectionContainer: HTMLElement;
    selectionManager: ISelectionManager;
    charMeasure: ICharMeasure;
    textarea: HTMLTextAreaElement;
    rows: number;
    cols: number;
    browser: IBrowser;
    writeBuffer: string[];
    children: HTMLElement[];
    cursorHidden: boolean;
    cursorState: number;
    defAttr: number;
    scrollback: number;
    buffers: IBufferSet;
    buffer: IBuffer;
    handler(data: string): void;
    on(event: string, callback: () => void): void;
    off(type: string, listener: IListenerType): void;
    scrollDisp(disp: number, suppressScrollEvent: boolean): void;
    cancel(ev: Event, force?: boolean): void;
    log(text: string): void;
    emit(event: string, data: any): void;
    reset(): void;
    showCursor(): void;
    blankLine(cur?: boolean, isWrapped?: boolean, cols?: number): LineData;
}
export declare class MockInputHandlingTerminal implements IInputHandlingTerminal {
    element: HTMLElement;
    options: ITerminalOptions;
    cols: number;
    rows: number;
    charset: {
        [key: string]: string;
    };
    gcharset: number;
    glevel: number;
    charsets: {
        [key: string]: string;
    }[];
    applicationKeypad: boolean;
    applicationCursor: boolean;
    originMode: boolean;
    insertMode: boolean;
    wraparoundMode: boolean;
    defAttr: number;
    curAttr: number;
    prefix: string;
    savedCols: number;
    x10Mouse: boolean;
    vt200Mouse: boolean;
    normalMouse: boolean;
    mouseEvents: boolean;
    sendFocus: boolean;
    utfMouse: boolean;
    sgrMouse: boolean;
    urxvtMouse: boolean;
    cursorHidden: boolean;
    buffers: IBufferSet;
    buffer: IBuffer;
    viewport: IViewport;
    selectionManager: ISelectionManager;
    focus(): void;
    convertEol: boolean;
    updateRange(y: number): void;
    scroll(isWrapped?: boolean): void;
    nextStop(x?: number): number;
    setgLevel(g: number): void;
    eraseAttr(): number;
    eraseRight(x: number, y: number): void;
    eraseLine(y: number): void;
    eraseLeft(x: number, y: number): void;
    blankLine(cur?: boolean, isWrapped?: boolean): [number, string, number][];
    prevStop(x?: number): number;
    is(term: string): boolean;
    send(data: string): void;
    setgCharset(g: number, charset: {
        [key: string]: string;
    }): void;
    resize(x: number, y: number): void;
    log(text: string, data?: any): void;
    reset(): void;
    showCursor(): void;
    refresh(start: number, end: number): void;
    matchColor(r1: number, g1: number, b1: number): number;
    error(text: string, data?: any): void;
    setOption(key: string, value: any): void;
    on(type: string, listener: IListenerType): void;
    off(type: string, listener: IListenerType): void;
    emit(type: string, data?: any): void;
}
export declare class MockBuffer implements IBuffer {
    lines: ICircularList<[number, string, number][]>;
    ydisp: number;
    ybase: number;
    y: number;
    x: number;
    tabs: any;
    scrollBottom: number;
    scrollTop: number;
    savedY: number;
    savedX: number;
    translateBufferLineToString(lineIndex: number, trimRight: boolean, startCol?: number, endCol?: number): string;
}
export declare class MockViewport implements IViewport {
    onWheel(ev: WheelEvent): void;
    onTouchStart(ev: TouchEvent): void;
    onTouchMove(ev: TouchEvent): void;
    syncScrollArea(): void;
}
export declare class MockCompositionHelper implements ICompositionHelper {
    compositionstart(): void;
    compositionupdate(ev: CompositionEvent): void;
    compositionend(): void;
    updateCompositionElements(dontRecurse?: boolean): void;
    keydown(ev: KeyboardEvent): boolean;
}
