import { ILinkMatcherOptions } from './Interfaces';
import { LinkMatcher, LinkMatcherHandler, LinkMatcherValidationCallback } from './Types';
export declare class Linkifier {
    protected static TIME_BEFORE_LINKIFY: number;
    protected _linkMatchers: LinkMatcher[];
    private _document;
    private _rows;
    private _rowTimeoutIds;
    private _nextLinkMatcherId;
    constructor();
    attachToDom(document: Document, rows: HTMLElement[]): void;
    linkifyRow(rowIndex: number): void;
    setHypertextLinkHandler(handler: LinkMatcherHandler): void;
    setHypertextValidationCallback(callback: LinkMatcherValidationCallback): void;
    registerLinkMatcher(regex: RegExp, handler: LinkMatcherHandler, options?: ILinkMatcherOptions): number;
    private _addLinkMatcherToList(matcher);
    deregisterLinkMatcher(matcherId: number): boolean;
    private _linkifyRow(rowIndex);
    private _doLinkifyRow(row, matcher);
    private _createAnchorElement(uri, handler, isHypertextLinkHandler);
    private _replaceNode(oldNode, ...newNodes);
    private _replaceNodeSubstringWithNode(targetNode, newNode, substring, substringIndex);
}
