/**
 * @license MIT
 */

import { CircularList } from './utils/CircularList';
import { ITerminal } from './Interfaces';
import { LineData, CharData } from './Types';

export class Buffer {
  /**
   * The line data of the buffer.
   */
  private _lines: CircularList<LineData>;

  /**
   * Gets the line data of the buffer.
   */
  public get lines(): CircularList<LineData> { return this._lines; }

  constructor(
    private _terminal: ITerminal,
    scrollback: number
  ) {
    this._lines = new CircularList<LineData>(scrollback);
    for (let i = 0; i < this._terminal.rows; i++) {
      this._lines.push(this.blankLine());
    }
  }

/**
 *
 * @param cur If cur return the back color xterm feature attribute. Else return defAttr.
 */
  public blankLine(cur?: boolean): LineData {
    const line = [];
    const attr = cur ? this._terminal.eraseAttr() : this._terminal.defAttr;
    const blankChar: CharData = [attr, ' ', 1];  // width defaults to 1 halfwidth character
    for (let i = 0; i < this._terminal.cols; i++) {
      line[i] = blankChar;
    }
    return line;
  }
}
