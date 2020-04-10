/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { IRenderer, IRenderDimensions, CharacterJoinerHandler } from 'browser/renderer/Types';
import { RenderDebouncer } from 'browser/RenderDebouncer';
import { EventEmitter, IEvent } from 'common/EventEmitter';
import { Disposable } from 'common/Lifecycle';
import { ScreenDprMonitor } from 'browser/ScreenDprMonitor';
import { addDisposableDomListener } from 'browser/Lifecycle';
import { IColorSet } from 'browser/Types';
import { IOptionsService } from 'common/services/Services';
import { ICharSizeService, IRenderService } from 'browser/services/Services';

export class RenderService extends Disposable implements IRenderService {
  serviceBrand: any;

  private _renderDebouncer: RenderDebouncer;
  private _screenDprMonitor: ScreenDprMonitor;

  private _isPaused: boolean = false;
  private _needsFullRefresh: boolean = false;
  private _canvasWidth: number = 0;
  private _canvasHeight: number = 0;

  private _onDimensionsChange = new EventEmitter<IRenderDimensions>();
  get onDimensionsChange(): IEvent<IRenderDimensions> { return this._onDimensionsChange.event; }
  private _onRender = new EventEmitter<{ start: number, end: number }>();
  get onRender(): IEvent<{ start: number, end: number }> { return this._onRender.event; }
  private _onRefreshRequest = new EventEmitter<{ start: number, end: number }>();
  get onRefreshRequest(): IEvent<{ start: number, end: number }> { return this._onRefreshRequest.event; }

  get dimensions(): IRenderDimensions { return this._renderer.dimensions; }

  constructor(
    private _renderer: IRenderer,
    private _rowCount: number,
    readonly screenElement: HTMLElement,
    @IOptionsService readonly optionsService: IOptionsService,
    @ICharSizeService readonly charSizeService: ICharSizeService
  ) {
    super();
    this._renderDebouncer = new RenderDebouncer((start, end) => this._renderRows(start, end));
    this.register(this._renderDebouncer);

    this._screenDprMonitor = new ScreenDprMonitor();
    this._screenDprMonitor.setListener(() => this.onDevicePixelRatioChange());
    this.register(this._screenDprMonitor);

    this.register(optionsService.onOptionChange(() => this._renderer.onOptionsChanged()));
    this.register(charSizeService.onCharSizeChange(() => this.onCharSizeChanged()));

    // No need to register this as renderer is explicitly disposed in RenderService.dispose
    this._renderer.onRequestRefreshRows(e => this.refreshRows(e.start, e.end));

    // dprchange should handle this case, we need this as well for browsers that don't support the
    // matchMedia query.
    this.register(addDisposableDomListener(window, 'resize', () => this.onDevicePixelRatioChange()));

    // Detect whether IntersectionObserver is detected and enable renderer pause
    // and resume based on terminal visibility if so
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(e => this._onIntersectionChange(e[e.length - 1]), { threshold: 0 });
      observer.observe(screenElement);
      this.register({ dispose: () => observer.disconnect() });
    }
  }

  private _onIntersectionChange(entry: IntersectionObserverEntry): void {
    this._isPaused = entry.intersectionRatio === 0;
    if (!this._isPaused && this._needsFullRefresh) {
      this.refreshRows(0, this._rowCount - 1);
      this._needsFullRefresh = false;
    }
  }

  refreshRows(start: number, end: number): void {
    if (this._isPaused) {
      this._needsFullRefresh = true;
      return;
    }
    this._renderDebouncer.refresh(start, end, this._rowCount);
  }

  private _renderRows(start: number, end: number): void {
    this._renderer.renderRows(start, end);
    this._onRender.fire({ start, end });
  }

  resize(cols: number, rows: number): void {
    this._rowCount = rows;
    this._fireOnCanvasResize();
  }

  changeOptions(): void {
    this._renderer.onOptionsChanged();
    this.refreshRows(0, this._rowCount - 1);
    this._fireOnCanvasResize();
  }

  private _fireOnCanvasResize(): void {
    // Don't fire the event if the dimensions haven't changed
    if (this._renderer.dimensions.canvasWidth === this._canvasWidth && this._renderer.dimensions.canvasHeight === this._canvasHeight) {
      return;
    }
    this._onDimensionsChange.fire(this._renderer.dimensions);
  }

  dispose(): void {
    this._renderer.dispose();
    super.dispose();
  }

  setRenderer(renderer: IRenderer): void {
    // TODO: RenderService should be the only one to dispose the renderer
    this._renderer.dispose();
    this._renderer = renderer;
    this._renderer.onRequestRefreshRows(e => this.refreshRows(e.start, e.end));
    this.refreshRows(0, this._rowCount - 1);
  }

  private _fullRefresh(): void {
    if (this._isPaused) {
      this._needsFullRefresh = true;
    } else {
      this.refreshRows(0, this._rowCount - 1);
    }
  }

  setColors(colors: IColorSet): void {
    this._renderer.setColors(colors);
    this._fullRefresh();
  }

  onDevicePixelRatioChange(): void {
    this._renderer.onDevicePixelRatioChange();
    this.refreshRows(0, this._rowCount - 1);
  }

  onResize(cols: number, rows: number): void {
    this._renderer.onResize(cols, rows);
    this._fullRefresh();
  }

  // TODO: Is this useful when we have onResize?
  onCharSizeChanged(): void {
    this._renderer.onCharSizeChanged();
  }

  onBlur(): void {
    this._renderer.onBlur();
  }

  onFocus(): void {
    this._renderer.onFocus();
  }

  onSelectionChanged(start: [number, number], end: [number, number], columnSelectMode: boolean): void {
    this._renderer.onSelectionChanged(start, end, columnSelectMode);
  }

  onCursorMove(): void {
    this._renderer.onCursorMove();
  }

  clear(): void {
    this._renderer.clear();
  }

  registerCharacterJoiner(handler: CharacterJoinerHandler): number {
    return this._renderer.registerCharacterJoiner(handler);
  }

  deregisterCharacterJoiner(joinerId: number): boolean {
    return this._renderer.deregisterCharacterJoiner(joinerId);
  }
}
