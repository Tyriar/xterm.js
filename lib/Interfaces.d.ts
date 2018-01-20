import { ICharset, ILinkMatcherOptions } from './Interfaces';
import { LinkMatcherHandler, LinkMatcherValidationCallback, LineData } from './Types';
import { IColorSet, IRenderer } from './renderer/Interfaces';
import { IMouseZoneManager } from './input/Interfaces';
export interface IBrowser {
    isNode: boolean;
    userAgent: string;
    platform: string;
    isFirefox: boolean;
    isMSIE: boolean;
    isMac: boolean;
    isIpad: boolean;
    isIphone: boolean;
    isMSWindows: boolean;
}
export interface IBufferAccessor {
    buffer: IBuffer;
}
export interface IElementAccessor {
    element: HTMLElement;
}
export interface ILinkifierAccessor {
    linkifier: ILinkifier;
}
export interface ITerminal extends ILinkifierAccessor, IBufferAccessor, IElementAccessor, IEventEmitter {
    selectionManager: ISelectionManager;
    charMeasure: ICharMeasure;
    textarea: HTMLTextAreaElement;
    renderer: IRenderer;
    rows: number;
    cols: number;
    browser: IBrowser;
    writeBuffer: string[];
    cursorHidden: boolean;
    cursorState: number;
    defAttr: number;
    options: ITerminalOptions;
    buffers: IBufferSet;
    isFocused: boolean;
    mouseHelper: IMouseHelper;
    bracketedPasteMode: boolean;
    handler(data: string): void;
    scrollLines(disp: number, suppressScrollEvent?: boolean): void;
    scrollToRow(row: number): number;
    cancel(ev: Event, force?: boolean): boolean | void;
    log(text: string): void;
    reset(): void;
    showCursor(): void;
    blankLine(cur?: boolean, isWrapped?: boolean, cols?: number): LineData;
    refresh(start: number, end: number): void;
}
export interface IInputHandlingTerminal extends IEventEmitter {
    element: HTMLElement;
    options: ITerminalOptions;
    cols: number;
    rows: number;
    charset: ICharset;
    gcharset: number;
    glevel: number;
    charsets: ICharset[];
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
    bell(): void;
    focus(): void;
    convertEol: boolean;
    updateRange(y: number): void;
    scroll(isWrapped?: boolean): void;
    setgLevel(g: number): void;
    eraseAttr(): number;
    eraseRight(x: number, y: number): void;
    eraseLine(y: number): void;
    eraseLeft(x: number, y: number): void;
    blankLine(cur?: boolean, isWrapped?: boolean): LineData;
    is(term: string): boolean;
    send(data: string): void;
    setgCharset(g: number, charset: ICharset): void;
    resize(x: number, y: number): void;
    log(text: string, data?: any): void;
    reset(): void;
    showCursor(): void;
    refresh(start: number, end: number): void;
    matchColor(r1: number, g1: number, b1: number): number;
    error(text: string, data?: any): void;
    setOption(key: string, value: any): void;
}
export interface ITerminalOptions {
    bellSound?: string;
    bellStyle?: string;
    cancelEvents?: boolean;
    cols?: number;
    convertEol?: boolean;
    cursorBlink?: boolean;
    cursorStyle?: string;
    debug?: boolean;
    disableStdin?: boolean;
    enableBold?: boolean;
    fontSize?: number;
    fontFamily?: string;
    handler?: (data: string) => void;
    letterSpacing?: number;
    lineHeight?: number;
    macOptionIsMeta?: boolean;
    rows?: number;
    screenKeys?: boolean;
    screenReaderMode?: boolean;
    scrollback?: number;
    tabStopWidth?: number;
    termName?: string;
    theme?: ITheme;
    useFlowControl?: boolean;
}
export interface IBuffer {
    lines: ICircularList<LineData>;
    ydisp: number;
    ybase: number;
    y: number;
    x: number;
    tabs: any;
    scrollBottom: number;
    scrollTop: number;
    savedY: number;
    savedX: number;
    isCursorInViewport: boolean;
    translateBufferLineToString(lineIndex: number, trimRight: boolean, startCol?: number, endCol?: number): string;
    nextStop(x?: number): number;
    prevStop(x?: number): number;
}
export interface IBufferSet extends IEventEmitter {
    alt: IBuffer;
    normal: IBuffer;
    active: IBuffer;
    activateNormalBuffer(): void;
    activateAltBuffer(): void;
}
export interface IMouseHelper {
    getCoords(event: {
        pageX: number;
        pageY: number;
    }, element: HTMLElement, charMeasure: ICharMeasure, lineHeight: number, colCount: number, rowCount: number, isSelection?: boolean): [number, number];
    getRawByteCoords(event: MouseEvent, element: HTMLElement, charMeasure: ICharMeasure, lineHeight: number, colCount: number, rowCount: number): {
        x: number;
        y: number;
    };
}
export interface IViewport {
    syncScrollArea(): void;
    onWheel(ev: WheelEvent): void;
    onTouchStart(ev: TouchEvent): void;
    onTouchMove(ev: TouchEvent): void;
    onThemeChanged(colors: IColorSet): void;
}
export interface ISelectionManager {
    selectionText: string;
    selectionStart: [number, number];
    selectionEnd: [number, number];
    disable(): void;
    enable(): void;
    setSelection(row: number, col: number, length: number): void;
}
export interface ICompositionHelper {
    compositionstart(): void;
    compositionupdate(ev: CompositionEvent): void;
    compositionend(): void;
    updateCompositionElements(dontRecurse?: boolean): void;
    keydown(ev: KeyboardEvent): boolean;
}
export interface ICharMeasure {
    width: number;
    height: number;
    measure(options: ITerminalOptions): void;
}
export interface ILinkifier extends IEventEmitter {
    attachToDom(mouseZoneManager: IMouseZoneManager): void;
    linkifyRows(start: number, end: number): void;
    setHypertextLinkHandler(handler: LinkMatcherHandler): void;
    setHypertextValidationCallback(callback: LinkMatcherValidationCallback): void;
    registerLinkMatcher(regex: RegExp, handler: LinkMatcherHandler, options?: ILinkMatcherOptions): number;
    deregisterLinkMatcher(matcherId: number): boolean;
}
export interface ICircularList<T> extends IEventEmitter {
    length: number;
    maxLength: number;
    forEach: (callbackfn: (value: T, index: number) => void) => void;
    get(index: number): T;
    set(index: number, value: T): void;
    push(value: T): void;
    pop(): T;
    splice(start: number, deleteCount: number, ...items: T[]): void;
    trimStart(count: number): void;
    shiftElements(start: number, count: number, offset: number): void;
}
export interface IEventEmitter {
    on(type: string, listener: IListenerType): void;
    off(type: string, listener: IListenerType): void;
    emit(type: string, data?: any): void;
    addDisposableListener(type: string, handler: IListenerType): IDisposable;
}
export interface IListenerType {
    (data?: any): void;
    listener?: (data?: any) => void;
}
export interface ILinkMatcherOptions {
    matchIndex?: number;
    validationCallback?: LinkMatcherValidationCallback;
    tooltipCallback?: LinkMatcherHandler;
    leaveCallback?: () => void;
    priority?: number;
}
export interface IInputHandler {
    addChar(char: string, code: number): void;
    bell(): void;
    lineFeed(): void;
    carriageReturn(): void;
    backspace(): void;
    tab(): void;
    shiftOut(): void;
    shiftIn(): void;
    insertChars(params?: number[]): void;
    cursorUp(params?: number[]): void;
    cursorDown(params?: number[]): void;
    cursorForward(params?: number[]): void;
    cursorBackward(params?: number[]): void;
    cursorNextLine(params?: number[]): void;
    cursorPrecedingLine(params?: number[]): void;
    cursorCharAbsolute(params?: number[]): void;
    cursorPosition(params?: number[]): void;
    cursorForwardTab(params?: number[]): void;
    eraseInDisplay(params?: number[]): void;
    eraseInLine(params?: number[]): void;
    insertLines(params?: number[]): void;
    deleteLines(params?: number[]): void;
    deleteChars(params?: number[]): void;
    scrollUp(params?: number[]): void;
    scrollDown(params?: number[]): void;
    eraseChars(params?: number[]): void;
    cursorBackwardTab(params?: number[]): void;
    charPosAbsolute(params?: number[]): void;
    HPositionRelative(params?: number[]): void;
    repeatPrecedingCharacter(params?: number[]): void;
    sendDeviceAttributes(params?: number[]): void;
    linePosAbsolute(params?: number[]): void;
    VPositionRelative(params?: number[]): void;
    HVPosition(params?: number[]): void;
    tabClear(params?: number[]): void;
    setMode(params?: number[]): void;
    resetMode(params?: number[]): void;
    charAttributes(params?: number[]): void;
    deviceStatus(params?: number[]): void;
    softReset(params?: number[]): void;
    setCursorStyle(params?: number[]): void;
    setScrollRegion(params?: number[]): void;
    saveCursor(params?: number[]): void;
    restoreCursor(params?: number[]): void;
}
export interface ITheme {
    foreground?: string;
    background?: string;
    cursor?: string;
    cursorAccent?: string;
    selection?: string;
    black?: string;
    red?: string;
    green?: string;
    yellow?: string;
    blue?: string;
    magenta?: string;
    cyan?: string;
    white?: string;
    brightBlack?: string;
    brightRed?: string;
    brightGreen?: string;
    brightYellow?: string;
    brightBlue?: string;
    brightMagenta?: string;
    brightCyan?: string;
    brightWhite?: string;
}
export interface IDisposable {
    dispose(): void;
}
export interface ILinkMatcher {
    id: number;
    regex: RegExp;
    handler: LinkMatcherHandler;
    hoverTooltipCallback?: LinkMatcherHandler;
    hoverLeaveCallback?: () => void;
    matchIndex?: number;
    validationCallback?: LinkMatcherValidationCallback;
    priority?: number;
}
export interface ICharset {
    [key: string]: string;
}
export interface ILinkHoverEvent {
    x: number;
    y: number;
    length: number;
}
