/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { IColorSet, IRenderDimensions } from './Interfaces';
import { IBuffer, ICharMeasure, ITerminal, ITerminalOptions } from '../Interfaces';
import { CHAR_DATA_WIDTH_INDEX, CHAR_DATA_CODE_INDEX, CHAR_DATA_CHAR_INDEX } from '../Buffer';
import { GridCache } from './GridCache';
import { FLAGS } from './Types';
import { BaseRenderLayer } from './BaseRenderLayer';
import { CharData } from '../Types';

export class MarkerRenderLayer extends BaseRenderLayer {
  // TODO: Retain drawn state

  constructor(container: HTMLElement, zIndex: number, colors: IColorSet) {
    super(container, 'marker', zIndex, true, colors);
  }

  public resize(terminal: ITerminal, dim: IRenderDimensions, charSizeChanged: boolean): void {
    super.resize(terminal, dim, charSizeChanged);
    // TODO: Trim any markers that are now outside the buffer
  }

  public reset(terminal: ITerminal): void {
    // TODO: Clear
  }


  public onGridChanged(terminal: ITerminal, startRow: number, endRow: number): void {
    // TODO: Draw at a better spot
    this._render(terminal);
  }

  private _render(terminal: ITerminal): void {
    this.clearAll();
    this._ctx.save();
    this._ctx.fillStyle = '#FF0000';
    (<any>terminal.buffer).markers.forEach(markerY => {
      const relativeY = markerY - terminal.buffer.ydisp;
      if (relativeY >= 0 && relativeY < terminal.rows) {
        this.fillCells(terminal.cols - 5, relativeY, 4, 1);
      }
    });
    this._ctx.restore();
  }
}
