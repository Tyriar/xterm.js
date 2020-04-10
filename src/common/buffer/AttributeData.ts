/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { IAttributeData, IColorRGB } from 'common/Types';
import { Attributes, FgFlags, BgFlags } from 'common/buffer/Constants';

export class AttributeData implements IAttributeData {
  static toColorRGB(value: number): IColorRGB {
    return [
      value >>> Attributes.RED_SHIFT & 255,
      value >>> Attributes.GREEN_SHIFT & 255,
      value & 255
    ];
  }
  static fromColorRGB(value: IColorRGB): number {
    return (value[0] & 255) << Attributes.RED_SHIFT | (value[1] & 255) << Attributes.GREEN_SHIFT | value[2] & 255;
  }

  clone(): IAttributeData {
    const newObj = new AttributeData();
    newObj.fg = this.fg;
    newObj.bg = this.bg;
    return newObj;
  }

  // data
  fg: number = 0;
  bg: number = 0;

  // flags
  isInverse(): number   { return this.fg & FgFlags.INVERSE; }
  isBold(): number      { return this.fg & FgFlags.BOLD; }
  isUnderline(): number { return this.fg & FgFlags.UNDERLINE; }
  isBlink(): number     { return this.fg & FgFlags.BLINK; }
  isInvisible(): number { return this.fg & FgFlags.INVISIBLE; }
  isItalic(): number    { return this.bg & BgFlags.ITALIC; }
  isDim(): number       { return this.bg & BgFlags.DIM; }

  // color modes
  getFgColorMode(): number { return this.fg & Attributes.CM_MASK; }
  getBgColorMode(): number { return this.bg & Attributes.CM_MASK; }
  isFgRGB(): boolean       { return (this.fg & Attributes.CM_MASK) === Attributes.CM_RGB; }
  isBgRGB(): boolean       { return (this.bg & Attributes.CM_MASK) === Attributes.CM_RGB; }
  isFgPalette(): boolean   { return (this.fg & Attributes.CM_MASK) === Attributes.CM_P16 || (this.fg & Attributes.CM_MASK) === Attributes.CM_P256; }
  isBgPalette(): boolean   { return (this.bg & Attributes.CM_MASK) === Attributes.CM_P16 || (this.bg & Attributes.CM_MASK) === Attributes.CM_P256; }
  isFgDefault(): boolean   { return (this.fg & Attributes.CM_MASK) === 0; }
  isBgDefault(): boolean   { return (this.bg & Attributes.CM_MASK) === 0; }
  isAttributeDefault(): boolean { return this.fg === 0 && this.bg === 0; }

  // colors
  getFgColor(): number {
    switch (this.fg & Attributes.CM_MASK) {
      case Attributes.CM_P16:
      case Attributes.CM_P256:  return this.fg & Attributes.PCOLOR_MASK;
      case Attributes.CM_RGB:   return this.fg & Attributes.RGB_MASK;
      default:                  return -1;  // CM_DEFAULT defaults to -1
    }
  }
  getBgColor(): number {
    switch (this.bg & Attributes.CM_MASK) {
      case Attributes.CM_P16:
      case Attributes.CM_P256:  return this.bg & Attributes.PCOLOR_MASK;
      case Attributes.CM_RGB:   return this.bg & Attributes.RGB_MASK;
      default:                  return -1;  // CM_DEFAULT defaults to -1
    }
  }
}
