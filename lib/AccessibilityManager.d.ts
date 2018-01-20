import { ITerminal, IDisposable } from './Interfaces';
export declare class AccessibilityManager implements IDisposable {
    private _terminal;
    private _accessibilityTreeRoot;
    private _rowContainer;
    private _rowElements;
    private _liveRegion;
    private _liveRegionLineCount;
    private _renderRowsDebouncer;
    private _navigationMode;
    private _disposables;
    private _charsToConsume;
    constructor(_terminal: ITerminal);
    dispose(): void;
    readonly isNavigationModeActive: boolean;
    enterNavigationMode(): void;
    private _onResize(cols, rows);
    private _createAccessibilityTreeNode();
    private _onTab(spaceCount);
    private _onChar(char);
    private _clearLiveRegion();
    private _onKey(keyChar);
    private _refreshRows(start?, end?);
    private _renderRows(start, end);
    rotateRows(): void;
    private _refreshRowsDimensions();
    announce(text: string): void;
}
