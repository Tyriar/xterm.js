/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { IRenderLayer, IColorSet, IRenderDimensions } from './Interfaces';
import { ITerminal, ITerminalOptions } from '../Interfaces';
import { acquireCharAtlas, CHAR_ATLAS_CELL_SPACING } from './CharAtlas';
import { CharData } from '../Types';
import { CHAR_DATA_WIDTH_INDEX, CHAR_DATA_CHAR_INDEX } from '../Buffer';

export const INVERTED_DEFAULT_COLOR = -1;

export abstract class BaseRenderLayer implements IRenderLayer {
  private _canvas: HTMLCanvasElement;
  protected _ctx: CanvasRenderingContext2D;
  private _scaledCharWidth: number;
  private _scaledCharHeight: number;
  private _scaledLineHeight: number;
  private _scaledLineDrawY: number;

  private _charAtlas: HTMLCanvasElement | ImageBitmap;

  constructor(
    container: HTMLElement,
    id: string,
    zIndex: number,
    private _alpha: boolean,
    protected _colors: IColorSet
  ) {
    this._canvas = document.createElement('canvas');
    this._canvas.id = `xterm-${id}-layer`;
    this._canvas.style.zIndex = zIndex.toString();
    this._ctx = this._canvas.getContext('2d', {_alpha});
    this._ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    // Draw the background if this is an opaque layer
    if (!_alpha) {
      this.clearAll();
    }
    container.appendChild(this._canvas);
  }

  public onOptionsChanged(terminal: ITerminal): void {}
  public onBlur(terminal: ITerminal): void {}
  public onFocus(terminal: ITerminal): void {}
  public onCursorMove(terminal: ITerminal): void {}
  public onGridChanged(terminal: ITerminal, startRow: number, endRow: number): void {}
  public onSelectionChanged(terminal: ITerminal, start: [number, number], end: [number, number]): void {}

  public onThemeChanged(terminal: ITerminal, colorSet: IColorSet): void {
    this._refreshCharAtlas(terminal, colorSet);
  }

  /**
   * Refreshes the char atlas, aquiring a new one if necessary.
   * @param terminal The terminal.
   * @param colorSet The color set to use for the char atlas.
   */
  private _refreshCharAtlas(terminal: ITerminal, colorSet: IColorSet): void {
    if (this._scaledCharWidth > 0 && this._scaledCharHeight > 0) {
      return;
    }
    this._charAtlas = null;
    const result = acquireCharAtlas(terminal, this._colors, this._scaledCharWidth, this._scaledCharHeight);
    if (result instanceof HTMLCanvasElement) {
      this._charAtlas = result;
    } else {
      result.then(bitmap => this._charAtlas = bitmap);
    }
  }

  public resize(terminal: ITerminal, dim: IRenderDimensions, charSizeChanged: boolean): void {
    this._scaledCharWidth = dim.scaledCharWidth;
    this._scaledCharHeight = dim.scaledCharHeight;
    this._scaledLineHeight = dim.scaledLineHeight;
    this._scaledLineDrawY = dim.scaledLineDrawY;
    this._canvas.width = dim.scaledCanvasWidth;
    this._canvas.height = dim.scaledCanvasHeight;
    this._canvas.style.width = `${dim.canvasWidth}px`;
    this._canvas.style.height = `${dim.canvasHeight}px`;

    // Draw the background if this is an opaque layer
    if (!this._alpha) {
      this.clearAll();
    }

    if (charSizeChanged) {
      this._refreshCharAtlas(terminal, this._colors);
    }
  }

  public abstract reset(terminal: ITerminal): void;

  /**
   * Gets the left position of a cell. Since character width is stored as a
   * float in order to prevent bad letter spacing, drawing shapes in the cell
   * need to be rounded.
   * @param x The column of the cell.
   */
  private _getCellLeft(x: number): number {
    return Math.round(x * this._scaledCharWidth);
  }

  /**
   * Fills 1+ cells completely. This uses the existing fillStyle on the context.
   * @param x The column to start at.
   * @param y The row to start at
   * @param width The number of columns to fill.
   * @param height The number of rows to fill.
   */
  protected fillCells(x: number, y: number, width: number, height: number): void {
    const cellLeft = this._getCellLeft(x);
    this._ctx.fillRect(
      cellLeft,
      y * this._scaledLineHeight,
      this._getCellLeft(x + width) - cellLeft,
      height * this._scaledLineHeight);
  }

  /**
   * Fills a 1px line (2px on HDPI) at the bottom of the cell. This uses the
   * existing fillStyle on the context.
   * @param x The column to fill.
   * @param y The row to fill.
   */
  protected fillBottomLineAtCells(x: number, y: number, width: number = 1): void {
    const cellLeft = this._getCellLeft(x);
    this._ctx.fillRect(
        cellLeft,
        (y + 1) * this._scaledLineHeight - window.devicePixelRatio - 1 /* Ensure it's drawn within the cell */,
        this._getCellLeft(x + width) - cellLeft,
        window.devicePixelRatio);
  }

  /**
   * Fills a 1px line (2px on HDPI) at the left of the cell. This uses the
   * existing fillStyle on the context.
   * @param x The column to fill.
   * @param y The row to fill.
   */
  protected fillLeftLineAtCell(x: number, y: number): void {
    this._ctx.fillRect(
        this._getCellLeft(x),
        y * this._scaledLineHeight,
        window.devicePixelRatio,
        this._scaledLineHeight);
  }

  /**
   * Strokes a 1px rectangle (2px on HDPI) around a cell. This uses the existing
   * strokeStyle on the context.
   * @param x The column to fill.
   * @param y The row to fill.
   */
  protected strokeRectAtCell(x: number, y: number, width: number, height: number): void {
    const cellLeft = this._getCellLeft(x);
    this._ctx.lineWidth = window.devicePixelRatio;
    this._ctx.strokeRect(
        cellLeft + window.devicePixelRatio / 2,
        y * this._scaledLineHeight + (window.devicePixelRatio / 2),
        this._getCellLeft(x + width) - cellLeft - window.devicePixelRatio,
        (height * this._scaledLineHeight) - window.devicePixelRatio);
  }

  /**
   * Clears the entire canvas.
   */
  protected clearAll(): void {
    if (this._alpha) {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    } else {
      this._ctx.fillStyle = this._colors.background;
      this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
  }

  /**
   * Clears 1+ cells completely.
   * @param x The column to start at.
   * @param y The row to start at.
   * @param width The number of columns to clear.
   * @param height The number of rows to clear.
   */
  protected clearCells(x: number, y: number, width: number, height: number): void {
    const cellLeft = this._getCellLeft(x);
    if (this._alpha) {
      this._ctx.clearRect(
          cellLeft,
          y * this._scaledLineHeight,
          this._getCellLeft(x + width) - cellLeft,
          height * this._scaledLineHeight);
    } else {
      this._ctx.fillStyle = this._colors.background;
      this._ctx.fillRect(
          cellLeft,
          y * this._scaledLineHeight,
          this._getCellLeft(x + width) - cellLeft,
          height * this._scaledLineHeight);
    }
  }

  /**
   * Draws a truecolor character at the cell. The character will be clipped to
   * ensure that it fits with the cell, including the cell to the right if it's
   * a wide character. This uses the existing fillStyle on the context.
   * @param terminal The terminal.
   * @param charData The char data for the character to draw.
   * @param x The column to draw at.
   * @param y The row to draw at.
   * @param color The color of the character.
   */
  protected fillCharTrueColor(terminal: ITerminal, charData: CharData, x: number, y: number): void {
    this._ctx.font = `${terminal.options.fontSize * window.devicePixelRatio}px ${terminal.options.fontFamily}`;
    this._ctx.textBaseline = 'top';

    // Since uncached characters are not coming off the char atlas with source
    // coordinates, it means that text drawn to the canvas (particularly '_')
    // can bleed into other cells. This code will clip the following fillText,
    // ensuring that its contents don't go beyond the cell bounds.
    this._ctx.beginPath();
    this._ctx.rect(x * this._scaledCharWidth, y * this._scaledLineHeight + this._scaledLineDrawY, charData[CHAR_DATA_WIDTH_INDEX] * this._scaledCharWidth, this._scaledCharHeight);
    this._ctx.clip();
    this._ctx.fillText(charData[CHAR_DATA_CHAR_INDEX], x * this._scaledCharWidth, y * this._scaledCharHeight);
  }

  /**
   * Draws a character at a cell. If possible this will draw using the character
   * atlas to reduce draw time.
   * @param terminal The terminal.
   * @param char The character.
   * @param code The character code.
   * @param width The width of the character.
   * @param x The column to draw at.
   * @param y The row to draw at.
   * @param fg The foreground color, in the format stored within the attributes.
   * @param bg The background color, in the format stored within the attributes.
   * This is used to validate whether a cached image can be used.
   * @param bold Whether the text is bold.
   */
  protected drawChar(terminal: ITerminal, char: string, code: number, width: number, x: number, y: number, fg: number, bg: number, bold: boolean): void {
    // Clear the cell next to this character if it's wide
    if (width === 2) {
      this.clearCells(x + 1, y, 1, 1);
    }

    let colorIndex = 0;
    if (fg < 256) {
      colorIndex = fg + 2;
    } else {
      // If default color and bold
      if (bold) {
        colorIndex = 1;
      }
    }
    const isAscii = code < 256;
    const isBasicColor = (colorIndex > 1 && fg < 16);
    const isDefaultColor = fg >= 256;
    const isDefaultBackground = bg >= 256;
    if (isAscii && (isBasicColor || isDefaultColor) && isDefaultBackground) {
      // ImageBitmap's draw about twice as fast as from a canvas
      const charAtlasCellWidth = this._scaledCharWidth + CHAR_ATLAS_CELL_SPACING;
      const charAtlasCellHeight = this._scaledCharHeight + CHAR_ATLAS_CELL_SPACING;
      this._ctx.drawImage(this._charAtlas,
          code * charAtlasCellWidth, colorIndex * charAtlasCellHeight, this._scaledCharWidth, this._scaledCharHeight,
          x * this._scaledCharWidth, y * this._scaledLineHeight + this._scaledLineDrawY, this._scaledCharWidth, this._scaledCharHeight);
    } else {
      this._drawUncachedChar(terminal, char, width, fg, x, y, bold);
    }
    // This draws the atlas (for debugging purposes)
    // this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    // this._ctx.drawImage(this._charAtlas, 0, 0);
  }

  /**
   * Draws a character at a cell. The character will be clipped to
   * ensure that it fits with the cell, including the cell to the right if it's
   * a wide character.
   * @param terminal The terminal.
   * @param char The character.
   * @param width The width of the character.
   * @param fg The foreground color, in the format stored within the attributes.
   * @param x The column to draw at.
   * @param y The row to draw at.
   */
  private _drawUncachedChar(terminal: ITerminal, char: string, width: number, fg: number, x: number, y: number, bold: boolean): void {
    this._ctx.save();
    this._ctx.font = `${terminal.options.fontSize * window.devicePixelRatio}px ${terminal.options.fontFamily}`;
    if (bold) {
      this._ctx.font = `bold ${this._ctx.font}`;
    }
    this._ctx.textBaseline = 'top';

    if (fg === INVERTED_DEFAULT_COLOR) {
      this._ctx.fillStyle = this._colors.background;
    } else if (fg < 256) {
      // 256 color support
      this._ctx.fillStyle = this._colors.ansi[fg];
    } else {
      this._ctx.fillStyle = this._colors.foreground;
    }

    // Since uncached characters are not coming off the char atlas with source
    // coordinates, it means that text drawn to the canvas (particularly '_')
    // can bleed into other cells. This code will clip the following fillText,
    // ensuring that its contents don't go beyond the cell bounds.
    this._ctx.beginPath();
    this._ctx.rect(x * this._scaledCharWidth, y * this._scaledLineHeight + this._scaledLineDrawY, width * this._scaledCharWidth, this._scaledCharHeight);
    this._ctx.clip();

    // Draw the character
    this._ctx.fillText(char, x * this._scaledCharWidth, y * this._scaledLineHeight + this._scaledLineDrawY);
    this._ctx.restore();
  }
}

