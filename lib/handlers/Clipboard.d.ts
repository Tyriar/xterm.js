import { ITerminal, ISelectionManager } from '../Interfaces';
export declare function prepareTextForTerminal(text: string, isMSWindows: boolean): string;
export declare function bracketTextForPaste(text: string, bracketedPasteMode: boolean): string;
export declare function copyHandler(ev: ClipboardEvent, term: ITerminal, selectionManager: ISelectionManager): void;
export declare function pasteHandler(ev: ClipboardEvent, term: ITerminal): void;
export declare function moveTextAreaUnderMouseCursor(ev: MouseEvent, textarea: HTMLTextAreaElement): void;
export declare function rightClickHandler(ev: MouseEvent, textarea: HTMLTextAreaElement, selectionManager: ISelectionManager): void;
