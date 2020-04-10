/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { Terminal as ITerminalApi, ITerminalOptions, IMarker, IDisposable, ILinkMatcherOptions, ITheme, ILocalizableStrings, ITerminalAddon, ISelectionPosition, IBuffer as IBufferApi, IBufferLine as IBufferLineApi, IBufferCell as IBufferCellApi, IParser, IFunctionIdentifier, ILinkProvider, IUnicodeHandling, IUnicodeVersionProvider } from 'xterm';
import { ITerminal } from '../Types';
import { IBufferLine, ICellData } from 'common/Types';
import { IBuffer } from 'common/buffer/Types';
import { CellData } from 'common/buffer/CellData';
import { Terminal as TerminalCore } from '../Terminal';
import * as Strings from '../browser/LocalizableStrings';
import { IEvent } from 'common/EventEmitter';
import { AddonManager } from './AddonManager';
import { IParams } from 'common/parser/Types';

export class Terminal implements ITerminalApi {
  private _core: ITerminal;
  private _addonManager: AddonManager;
  private _parser: IParser;

  constructor(options?: ITerminalOptions) {
    this._core = new TerminalCore(options);
    this._addonManager = new AddonManager();
  }

  get onCursorMove(): IEvent<void> { return this._core.onCursorMove; }
  get onLineFeed(): IEvent<void> { return this._core.onLineFeed; }
  get onSelectionChange(): IEvent<void> { return this._core.onSelectionChange; }
  get onData(): IEvent<string> { return this._core.onData; }
  get onBinary(): IEvent<string> { return this._core.onBinary; }
  get onTitleChange(): IEvent<string> { return this._core.onTitleChange; }
  get onScroll(): IEvent<number> { return this._core.onScroll; }
  get onKey(): IEvent<{ key: string, domEvent: KeyboardEvent }> { return this._core.onKey; }
  get onRender(): IEvent<{ start: number, end: number }> { return this._core.onRender; }
  get onResize(): IEvent<{ cols: number, rows: number }> { return this._core.onResize; }

  get element(): HTMLElement | undefined { return this._core.element; }
  get parser(): IParser {
    if (!this._parser) {
      this._parser = new ParserApi(this._core);
    }
    return this._parser;
  }
  get unicode(): IUnicodeHandling {
    return new UnicodeApi(this._core);
  }
  get textarea(): HTMLTextAreaElement | undefined { return this._core.textarea; }
  get rows(): number { return this._core.rows; }
  get cols(): number { return this._core.cols; }
  get buffer(): IBufferApi { return new BufferApiView(this._core.buffer); }
  get markers(): ReadonlyArray<IMarker> { return this._core.markers; }
  blur(): void {
    this._core.blur();
  }
  focus(): void {
    this._core.focus();
  }
  resize(columns: number, rows: number): void {
    this._verifyIntegers(columns, rows);
    this._core.resize(columns, rows);
  }
  open(parent: HTMLElement): void {
    this._core.open(parent);
  }
  attachCustomKeyEventHandler(customKeyEventHandler: (event: KeyboardEvent) => boolean): void {
    this._core.attachCustomKeyEventHandler(customKeyEventHandler);
  }
  registerLinkMatcher(regex: RegExp, handler: (event: MouseEvent, uri: string) => void, options?: ILinkMatcherOptions): number {
    return this._core.registerLinkMatcher(regex, handler, options);
  }
  deregisterLinkMatcher(matcherId: number): void {
    this._core.deregisterLinkMatcher(matcherId);
  }
  registerLinkProvider(linkProvider: ILinkProvider): IDisposable {
    return this._core.registerLinkProvider(linkProvider);
  }
  registerCharacterJoiner(handler: (text: string) => [number, number][]): number {
    return this._core.registerCharacterJoiner(handler);
  }
  deregisterCharacterJoiner(joinerId: number): void {
    this._core.deregisterCharacterJoiner(joinerId);
  }
  registerMarker(cursorYOffset: number): IMarker {
    this._verifyIntegers(cursorYOffset);
    return this._core.addMarker(cursorYOffset);
  }
  addMarker(cursorYOffset: number): IMarker {
    return this.registerMarker(cursorYOffset);
  }
  hasSelection(): boolean {
    return this._core.hasSelection();
  }
  select(column: number, row: number, length: number): void {
    this._verifyIntegers(column, row, length);
    this._core.select(column, row, length);
  }
  getSelection(): string {
    return this._core.getSelection();
  }
  getSelectionPosition(): ISelectionPosition | undefined {
    return this._core.getSelectionPosition();
  }
  clearSelection(): void {
    this._core.clearSelection();
  }
  selectAll(): void {
    this._core.selectAll();
  }
  selectLines(start: number, end: number): void {
    this._verifyIntegers(start, end);
    this._core.selectLines(start, end);
  }
  dispose(): void {
    this._addonManager.dispose();
    this._core.dispose();
  }
  scrollLines(amount: number): void {
    this._verifyIntegers(amount);
    this._core.scrollLines(amount);
  }
  scrollPages(pageCount: number): void {
    this._verifyIntegers(pageCount);
    this._core.scrollPages(pageCount);
  }
  scrollToTop(): void {
    this._core.scrollToTop();
  }
  scrollToBottom(): void {
    this._core.scrollToBottom();
  }
  scrollToLine(line: number): void {
    this._verifyIntegers(line);
    this._core.scrollToLine(line);
  }
  clear(): void {
    this._core.clear();
  }
  write(data: string | Uint8Array, callback?: () => void): void {
    this._core.write(data, callback);
  }
  writeUtf8(data: Uint8Array, callback?: () => void): void {
    this._core.write(data, callback);
  }
  writeln(data: string | Uint8Array, callback?: () => void): void {
    this._core.write(data);
    this._core.write('\r\n', callback);
  }
  paste(data: string): void {
    this._core.paste(data);
  }
  getOption(key: 'bellSound' | 'bellStyle' | 'cursorStyle' | 'fontFamily' | 'fontWeight' | 'fontWeightBold' | 'logLevel' | 'rendererType' | 'termName' | 'wordSeparator'): string;
  getOption(key: 'allowTransparency' | 'cancelEvents' | 'convertEol' | 'cursorBlink' | 'disableStdin' | 'macOptionIsMeta' | 'rightClickSelectsWord' | 'popOnBell' | 'visualBell'): boolean;
  getOption(key: 'cols' | 'fontSize' | 'letterSpacing' | 'lineHeight' | 'rows' | 'tabStopWidth' | 'scrollback'): number;
  getOption(key: string): any;
  getOption(key: any): any {
    return this._core.optionsService.getOption(key);
  }
  setOption(key: 'bellSound' | 'fontFamily' | 'termName' | 'wordSeparator', value: string): void;
  setOption(key: 'fontWeight' | 'fontWeightBold', value: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'): void;
  setOption(key: 'logLevel', value: 'debug' | 'info' | 'warn' | 'error' | 'off'): void;
  setOption(key: 'bellStyle', value: 'none' | 'visual' | 'sound' | 'both'): void;
  setOption(key: 'cursorStyle', value: 'block' | 'underline' | 'bar'): void;
  setOption(key: 'allowTransparency' | 'cancelEvents' | 'convertEol' | 'cursorBlink' | 'disableStdin' | 'macOptionIsMeta' | 'rightClickSelectsWord' | 'popOnBell' | 'visualBell', value: boolean): void;
  setOption(key: 'fontSize' | 'letterSpacing' | 'lineHeight' | 'tabStopWidth' | 'scrollback', value: number): void;
  setOption(key: 'theme', value: ITheme): void;
  setOption(key: 'cols' | 'rows', value: number): void;
  setOption(key: string, value: any): void;
  setOption(key: any, value: any): void {
    this._core.optionsService.setOption(key, value);
  }
  refresh(start: number, end: number): void {
    this._verifyIntegers(start, end);
    this._core.refresh(start, end);
  }
  reset(): void {
    this._core.reset();
  }
  loadAddon(addon: ITerminalAddon): void {
    return this._addonManager.loadAddon(this, addon);
  }
  static get strings(): ILocalizableStrings {
    return Strings;
  }

  private _verifyIntegers(...values: number[]): void {
    values.forEach(value => {
      if (value === Infinity || isNaN(value) || value % 1 !== 0) {
        throw new Error('This API only accepts integers');
      }
    });
  }
}

class BufferApiView implements IBufferApi {
  constructor(private _buffer: IBuffer) { }

  get cursorY(): number { return this._buffer.y; }
  get cursorX(): number { return this._buffer.x; }
  get viewportY(): number { return this._buffer.ydisp; }
  get baseY(): number { return this._buffer.ybase; }
  get length(): number { return this._buffer.lines.length; }
  getLine(y: number): IBufferLineApi | undefined {
    const line = this._buffer.lines.get(y);
    if (!line) {
      return undefined;
    }
    return new BufferLineApiView(line);
  }
  getNullCell(): IBufferCellApi { return new CellData(); }
}

class BufferLineApiView implements IBufferLineApi {
  constructor(private _line: IBufferLine) { }

  get isWrapped(): boolean { return this._line.isWrapped; }
  get length(): number { return this._line.length; }
  getCell(x: number, cell?: IBufferCellApi): IBufferCellApi | undefined {
    if (x < 0 || x >= this._line.length) {
      return undefined;
    }

    if (cell) {
      this._line.loadCell(x, <ICellData>cell);
      return cell;
    }
    return this._line.loadCell(x, new CellData());
  }
  translateToString(trimRight?: boolean, startColumn?: number, endColumn?: number): string {
    return this._line.translateToString(trimRight, startColumn, endColumn);
  }
}

class ParserApi implements IParser {
  constructor(private _core: ITerminal) { }

  registerCsiHandler(id: IFunctionIdentifier, callback: (params: (number | number[])[]) => boolean): IDisposable {
    return this._core.addCsiHandler(id, (params: IParams) => callback(params.toArray()));
  }
  addCsiHandler(id: IFunctionIdentifier, callback: (params: (number | number[])[]) => boolean): IDisposable {
    return this.registerCsiHandler(id, callback);
  }
  registerDcsHandler(id: IFunctionIdentifier, callback: (data: string, param: (number | number[])[]) => boolean): IDisposable {
    return this._core.addDcsHandler(id, (data: string, params: IParams) => callback(data, params.toArray()));
  }
  addDcsHandler(id: IFunctionIdentifier, callback: (data: string, param: (number | number[])[]) => boolean): IDisposable {
    return this.registerDcsHandler(id, callback);
  }
  registerEscHandler(id: IFunctionIdentifier, handler: () => boolean): IDisposable {
    return this._core.addEscHandler(id, handler);
  }
  addEscHandler(id: IFunctionIdentifier, handler: () => boolean): IDisposable {
    return this.registerEscHandler(id, handler);
  }
  registerOscHandler(ident: number, callback: (data: string) => boolean): IDisposable {
    return this._core.addOscHandler(ident, callback);
  }
  addOscHandler(ident: number, callback: (data: string) => boolean): IDisposable {
    return this.registerOscHandler(ident, callback);
  }
}

class UnicodeApi implements IUnicodeHandling {
  constructor(private _core: ITerminal) { }

  register(provider: IUnicodeVersionProvider): void {
    this._core.unicodeService.register(provider);
  }

  get versions(): string[] {
    return this._core.unicodeService.versions;
  }

  get activeVersion(): string {
    return this._core.unicodeService.activeVersion;
  }

  set activeVersion(version: string) {
    this._core.unicodeService.activeVersion = version;
  }
}
