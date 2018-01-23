export declare type LinkMatcherHandler = (event: MouseEvent, uri: string) => boolean | void;
export declare type LinkMatcherValidationCallback = (uri: string, callback: (isValid: boolean) => void) => void;
export declare type CustomKeyEventHandler = (event: KeyboardEvent) => boolean;
export declare type CharData = [number, string, number, number];
export declare type LineData = CharData[];
export declare enum LinkHoverEventTypes {
    HOVER = "linkhover",
    TOOLTIP = "linktooltip",
    LEAVE = "linkleave",
}
export declare type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
