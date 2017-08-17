import { ITerminal } from './Interfaces';
export declare class CompositionHelper {
    private textarea;
    private compositionView;
    private terminal;
    private isComposing;
    private compositionPosition;
    private isSendingComposition;
    constructor(textarea: HTMLTextAreaElement, compositionView: HTMLElement, terminal: ITerminal);
    compositionstart(): void;
    compositionupdate(ev: CompositionEvent): void;
    compositionend(): void;
    keydown(ev: KeyboardEvent): boolean;
    private finalizeComposition(waitForPropogation);
    private handleAnyTextareaChanges();
    updateCompositionElements(dontRecurse?: boolean): void;
    private clearTextareaPosition();
}
