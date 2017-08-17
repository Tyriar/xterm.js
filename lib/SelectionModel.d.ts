import { ITerminal } from './Interfaces';
export declare class SelectionModel {
    private _terminal;
    isSelectAllActive: boolean;
    selectionStart: [number, number];
    selectionStartLength: number;
    selectionEnd: [number, number];
    constructor(_terminal: ITerminal);
    clearSelection(): void;
    readonly finalSelectionStart: [number, number];
    readonly finalSelectionEnd: [number, number];
    areSelectionValuesReversed(): boolean;
    onTrim(amount: number): boolean;
}
