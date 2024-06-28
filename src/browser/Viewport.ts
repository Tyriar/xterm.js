/**
 * Copyright (c) 2024 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { IRenderService, IThemeService } from 'browser/services/Services';
import { EventEmitter } from 'common/EventEmitter';
import { Disposable } from 'common/Lifecycle';
import { IBufferService, IOptionsService } from 'common/services/Services';
import { DomScrollableElement } from 'vs/base/browser/ui/scrollbar/scrollableElement';
import type { ScrollableElementChangeOptions } from 'vs/base/browser/ui/scrollbar/scrollableElementOptions';
import { ScrollbarVisibility, type ScrollEvent } from 'vs/base/common/scrollable';

export class Viewport extends Disposable{

  protected _onRequestScrollLines = this.register(new EventEmitter<number>());
  public readonly onRequestScrollLines = this._onRequestScrollLines.event;

  private _scrollableElement: DomScrollableElement;

  private _queuedAnimationFrame?: number;
  private _latestYDisp?: number;
  private _isSyncing: boolean = false;
  private _isHandlingScroll: boolean = false;
  private _suppressOnScrollHandler: boolean = false;

  constructor(
    element: HTMLElement,
    screenElement: HTMLElement,
    @IBufferService private readonly _bufferService: IBufferService,
    @IThemeService themeService: IThemeService,
    @IOptionsService private readonly _optionsService: IOptionsService,
    @IRenderService private readonly _renderService: IRenderService
  ) {
    super();

    // TODO: Support smooth scroll
    // TODO: Support fastScrollModifier?
    // TODO: overviewRulerWidth should deprecated in favor of scrollBarWidth?

    this._scrollableElement = this.register(new DomScrollableElement(screenElement, {
      vertical: ScrollbarVisibility.Auto,
      horizontal: ScrollbarVisibility.Hidden,
      useShadows: false,
      mouseWheelSmoothScroll: true,
      ...this._getMutableOptions()
    }));
    this.register(this._optionsService.onMultipleOptionChange([
      'scrollSensitivity',
      'fastScrollSensitivity',
      'overviewRulerWidth'
    ], () => this._scrollableElement.updateOptions(this._getMutableOptions())));

    this._scrollableElement.setScrollDimensions({ height: 0, scrollHeight: 0 });
    this._scrollableElement.getDomNode().style.backgroundColor = themeService.colors.background.css;
    element.appendChild(this._scrollableElement.getDomNode());

    this.register(this._bufferService.onResize(() => this._queueSync()));
    this.register(this._bufferService.onScroll(ydisp => this._queueSync(ydisp)));

    this.register(this._scrollableElement.onScroll(e => this._handleScroll(e)));
  }

  private _getMutableOptions(): ScrollableElementChangeOptions {
    return {
      mouseWheelScrollSensitivity: this._optionsService.rawOptions.scrollSensitivity,
      fastScrollSensitivity: this._optionsService.rawOptions.fastScrollSensitivity,
      verticalScrollbarSize: this._optionsService.rawOptions.overviewRulerWidth || 14
    };
  }

  private _queueSync(ydisp?: number): void {
    // Update state
    if (ydisp !== undefined) {
      this._latestYDisp = ydisp;
    }

    // Don't queue more than one callback
    if (this._queuedAnimationFrame !== undefined) {
      return;
    }
    this._queuedAnimationFrame = this._renderService.addRefreshCallback(() => this._sync(this._latestYDisp));
    this._latestYDisp = undefined;
    this._queuedAnimationFrame = undefined;
  }

  private _sync(ydisp: number = this._bufferService.buffer.ydisp): void {
    if (!this._renderService || this._isSyncing) {
      return;
    }
    this._isSyncing = true;

    // Ignore any onScroll event that happens as a result of dimensions changing as this should
    // never cause a scrollLines call, only setScrollPosition can do that.
    this._suppressOnScrollHandler = true;
    this._scrollableElement.setScrollDimensions({
      height: this._renderService.dimensions.css.canvas.height,
      scrollHeight: this._renderService.dimensions.css.cell.height * this._bufferService.buffer.lines.length
    });
    this._suppressOnScrollHandler = false;

    this._scrollableElement.setScrollPosition({
      scrollTop: ydisp * this._renderService.dimensions.css.cell.height
    });

    this._isSyncing = false;
  }

  private _handleScroll(e: ScrollEvent): void {
    if (!this._renderService) {
      return;
    }
    if (this._isHandlingScroll || this._suppressOnScrollHandler) {
      return;
    }
    this._isHandlingScroll = true;
    const newRow = Math.round(e.scrollTop / this._renderService.dimensions.css.cell.height);
    const diff = newRow - this._bufferService.buffer.ydisp;
    if (diff !== 0) {
      this._onRequestScrollLines.fire(diff);
    }
    this._isHandlingScroll = false;
  }
}
