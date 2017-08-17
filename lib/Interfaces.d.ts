import { ILinkMatcherOptions } from './Interfaces';
import { LinkMatcherHandler, LinkMatcherValidationCallback, Charset, LineData } from './Types';
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
export interface ITerminal extends IEventEmitter {
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
    options: ITerminalOptions;
    buffers: IBufferSet;
    buffer: IBuffer;
    handler(data: string): void;
    scrollDisp(disp: number, suppressScrollEvent?: boolean): void;
    cancel(ev: Event, force?: boolean): boolean | void;
    log(text: string): void;
    reset(): void;
    showCursor(): void;
    blankLine(cur?: boolean, isWrapped?: boolean, cols?: number): LineData;
}
export interface IInputHandlingTerminal extends IEventEmitter {
    element: HTMLElement;
    options: ITerminalOptions;
    cols: number;
    rows: number;
    charset: Charset;
    gcharset: number;
    glevel: number;
    charsets: Charset[];
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
    blankLine(cur?: boolean, isWrapped?: boolean): LineData;
    prevStop(x?: number): number;
    is(term: string): boolean;
    send(data: string): void;
    setgCharset(g: number, charset: Charset): void;
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
    cancelEvents?: boolean;
    colors?: string[];
    cols?: number;
    convertEol?: boolean;
    cursorBlink?: boolean;
    cursorStyle?: string;
    debug?: boolean;
    disableStdin?: boolean;
    geometry?: [number, number];
    handler?: (data: string) => void;
    popOnBell?: boolean;
    rows?: number;
    screenKeys?: boolean;
    scrollback?: number;
    tabStopWidth?: number;
    termName?: string;
    useFlowControl?: boolean;
    visualBell?: boolean;
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
    translateBufferLineToString(lineIndex: number, trimRight: boolean, startCol?: number, endCol?: number): string;
}
export interface IBufferSet {
    alt: IBuffer;
    normal: IBuffer;
    active: IBuffer;
    activateNormalBuffer(): void;
    activateAltBuffer(): void;
}
export interface IViewport {
    syncScrollArea(): void;
    onWheel(ev: WheelEvent): void;
    onTouchStart(ev: TouchEvent): void;
    onTouchMove(ev: TouchEvent): void;
}
export interface ISelectionManager {
    selectionText: string;
    selectionStart: [number, number];
    selectionEnd: [number, number];
    disable(): void;
    enable(): void;
    setBuffer(buffer: IBuffer): void;
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
    measure(): void;
}
export interface ILinkifier {
    linkifyRow(rowIndex: number): void;
    attachHypertextLinkHandler(handler: LinkMatcherHandler): void;
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
}
export interface IListenerType {
    (data?: any): void;
    listener?: (data?: any) => void;
}
export interface ILinkMatcherOptions {
    matchIndex?: number;
    validationCallback?: LinkMatcherValidationCallback;
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
