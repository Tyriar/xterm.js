/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { ICharSizeService, IRenderService, IMouseService } from 'browser/services/Services';
import { getCoords, getRawByteCoords } from './Mouse';

export class MouseService implements IMouseService {
  serviceBrand: any;

  constructor(
    @IRenderService private readonly _renderService: IRenderService,
    @ICharSizeService private readonly _charSizeService: ICharSizeService
  ) {
  }

  public getCoords(event: {clientX: number, clientY: number}, element: HTMLElement, colCount: number, rowCount: number, isSelection?: boolean): [number, number] | undefined {
    return getCoords(
      event,
      element,
      colCount,
      rowCount,
      this._charSizeService.hasValidSize,
      this._renderService.dimensions.actualCellWidth,
      this._renderService.dimensions.actualCellHeight,
      isSelection
    );
  }

  public getRawByteCoords(event: MouseEvent, element: HTMLElement, colCount: number, rowCount: number): { x: number, y: number } | undefined {
    const coords = this.getCoords(event, element, colCount, rowCount);
    return getRawByteCoords(coords);
  }
}
