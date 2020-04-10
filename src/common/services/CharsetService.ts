/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { ICharsetService } from 'common/services/Services';
import { ICharset } from 'common/Types';

export class CharsetService implements ICharsetService {
  serviceBrand: any;

  charset: ICharset | undefined;
  charsets: ICharset[] = [];
  glevel: number = 0;

  reset(): void {
    this.charset = undefined;
    this.charsets = [];
    this.glevel = 0;
  }

  setgLevel(g: number): void {
    this.glevel = g;
    this.charset = this.charsets[g];
  }

  setgCharset(g: number, charset: ICharset): void {
    this.charsets[g] = charset;
    if (this.glevel === g) {
      this.charset = charset;
    }
  }
}
