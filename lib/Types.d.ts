export declare type LinkMatcher = {
    id: number;
    regex: RegExp;
    handler: LinkMatcherHandler;
    matchIndex?: number;
    validationCallback?: LinkMatcherValidationCallback;
    priority?: number;
};
export declare type LinkMatcherHandler = (event: MouseEvent, uri: string) => boolean | void;
export declare type LinkMatcherValidationCallback = (uri: string, element: HTMLElement, callback: (isValid: boolean) => void) => void;
export declare type CustomKeyEventHandler = (event: KeyboardEvent) => boolean;
export declare type Charset = {
    [key: string]: string;
};
export declare type CharData = [number, string, number];
export declare type LineData = CharData[];
export declare type Option = BooleanOption | StringOption | StringArrayOption | NumberOption | GeometryOption | HandlerOption;
export declare type BooleanOption = 'cancelEvents' | 'convertEol' | 'cursorBlink' | 'debug' | 'disableStdin' | 'popOnBell' | 'screenKeys' | 'useFlowControl' | 'visualBell';
export declare type StringOption = 'cursorStyle' | 'termName';
export declare type StringArrayOption = 'colors';
export declare type NumberOption = 'cols' | 'rows' | 'tabStopWidth' | 'scrollback';
export declare type GeometryOption = 'geometry';
export declare type HandlerOption = 'handler';
