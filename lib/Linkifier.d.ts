import { ILinkMatcher, ILinkMatcherOptions, IBufferAccessor, ILinkifier, IElementAccessor } from './Interfaces';
import { LinkMatcherHandler, LinkMatcherValidationCallback } from './Types';
import { IMouseZoneManager } from './input/Interfaces';
import { EventEmitter } from './EventEmitter';
export declare class Linkifier extends EventEmitter implements ILinkifier {
    protected _terminal: IBufferAccessor & IElementAccessor;
    protected static TIME_BEFORE_LINKIFY: number;
    protected _linkMatchers: ILinkMatcher[];
    private _mouseZoneManager;
    private _rowsTimeoutId;
    private _nextLinkMatcherId;
    private _rowsToLinkify;
    constructor(_terminal: IBufferAccessor & IElementAccessor);
    attachToDom(mouseZoneManager: IMouseZoneManager): void;
    linkifyRows(start: number, end: number): void;
    private _linkifyRows();
    setHypertextLinkHandler(handler: LinkMatcherHandler): void;
    setHypertextValidationCallback(callback: LinkMatcherValidationCallback): void;
    registerLinkMatcher(regex: RegExp, handler: LinkMatcherHandler, options?: ILinkMatcherOptions): number;
    private _addLinkMatcherToList(matcher);
    deregisterLinkMatcher(matcherId: number): boolean;
    private _linkifyRow(rowIndex);
    private _doLinkifyRow(rowIndex, text, matcher, offset?);
    private _addLink(x, y, uri, matcher);
}
