import { ITerminal, IBuffer, IBufferSet, IBrowser, ICharMeasure, ISelectionManager, ITerminalOptions, IListenerType, IInputHandlingTerminal, IViewport, ICircularList, ICompositionHelper, ITheme, ILinkifier, IMouseHelper, IDisposable } from '../Interfaces';
import { LineData } from '../Types';
import { IColorSet, IRenderer, IRenderDimensions, IColorManager } from '../renderer/Interfaces';
export declare class MockTerminal implements ITerminal {
    bracketedPasteMode: boolean;
    mouseHelper: IMouseHelper;
    renderer: IRenderer;
    linkifier: ILinkifier;
    isFocused: boolean;
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
    addDisposableListener(type: string, handler: IListenerType): IDisposable;
    scrollLines(disp: number, suppressScrollEvent: boolean): void;
    scrollToRow(absoluteRow: number): number;
    cancel(ev: Event, force?: boolean): void;
    log(text: string): void;
    emit(event: string, data: any): void;
    reset(): void;
    showCursor(): void;
    refresh(start: number, end: number): void;
    blankLine(cur?: boolean, isWrapped?: boolean, cols?: number): LineData;
}
export declare class MockCharMeasure implements ICharMeasure {
    width: number;
    height: number;
    measure(options: ITerminalOptions): void;
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
    bracketedPasteMode: boolean;
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
    bell(): void;
    updateRange(y: number): void;
    scroll(isWrapped?: boolean): void;
    nextStop(x?: number): number;
    setgLevel(g: number): void;
    eraseAttr(): number;
    eraseRight(x: number, y: number): void;
    eraseLine(y: number): void;
    eraseLeft(x: number, y: number): void;
    blankLine(cur?: boolean, isWrapped?: boolean): [number, string, number, number][];
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
    addDisposableListener(type: string, handler: IListenerType): IDisposable;
}
export declare class MockBuffer implements IBuffer {
    isCursorInViewport: boolean;
    lines: ICircularList<[number, string, number, number][]>;
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
    nextStop(x?: number): number;
    prevStop(x?: number): number;
}
export declare class MockRenderer implements IRenderer {
    colorManager: IColorManager;
    on(type: string, listener: IListenerType): void;
    off(type: string, listener: IListenerType): void;
    emit(type: string, data?: any): void;
    addDisposableListener(type: string, handler: IListenerType): IDisposable;
    dimensions: IRenderDimensions;
    setTheme(theme: ITheme): IColorSet;
    onResize(cols: number, rows: number, didCharSizeChange: boolean): void;
    onCharSizeChanged(): void;
    onBlur(): void;
    onFocus(): void;
    onSelectionChanged(start: [number, number], end: [number, number]): void;
    onCursorMove(): void;
    onOptionsChanged(): void;
    onWindowResize(devicePixelRatio: number): void;
    clear(): void;
    refreshRows(start: number, end: number): void;
}
export declare class MockViewport implements IViewport {
    onThemeChanged(colors: IColorSet): void;
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
