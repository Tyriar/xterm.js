import { IInputHandler } from './Interfaces';
export declare enum ParserState {
    NORMAL = 0,
    ESCAPED = 1,
    CSI_PARAM = 2,
    CSI = 3,
    OSC = 4,
    CHARSET = 5,
    DCS = 6,
    IGNORE = 7,
}
export declare class Parser {
    private _inputHandler;
    private _terminal;
    private _state;
    private _position;
    constructor(_inputHandler: IInputHandler, _terminal: any);
    parse(data: string): ParserState;
    setState(state: ParserState): void;
    setPrefix(prefix: string): void;
    setPostfix(postfix: string): void;
    setParam(param: number): void;
    getParam(): number;
    finalizeParam(): void;
    skipNextChar(): void;
}
