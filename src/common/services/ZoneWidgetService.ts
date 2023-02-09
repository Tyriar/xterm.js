/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { EventEmitter } from 'common/EventEmitter';
import { Disposable, toDisposable } from 'common/Lifecycle';
import { IBufferService, IZoneWidget, IZoneWidgetService } from 'common/services/Services';
import { IMarker } from 'common/Types';

export class ZoneWidgetService implements IZoneWidgetService {
  public serviceBrand: undefined;

  private _zoneWidgets: IZoneWidget[] = [];
  public get zoneWidgets(): IZoneWidget[] { return this._zoneWidgets; }

  constructor(
    @IBufferService private readonly _bufferService: IBufferService
  ) {
  }

  public register(y: number, height: number): IZoneWidget {
    const marker = this._bufferService.buffer.addMarker(y);
    const zoneWidget = new ZoneWidget(marker, height);
    zoneWidget.register(marker.onDispose(() => zoneWidget.dispose()));
    zoneWidget.register(toDisposable(() => {
      const index = this._zoneWidgets.indexOf(zoneWidget);
      if (index !== -1) {
        this._zoneWidgets.splice(index, 1);
      }
    }));
    return zoneWidget;
  }
}

class ZoneWidget extends Disposable implements IZoneWidget {
  public serviceBrand: undefined;

  public element: HTMLElement | undefined;

  public get isDisposed(): boolean { return this._isDisposed; }

  private readonly _onRender = this.register(new EventEmitter<HTMLElement>());
  public readonly onRender = this._onRender.event;
  private readonly _onDispose = this.register(new EventEmitter<void>());
  public readonly onDispose = this._onDispose.event;

  constructor(
    public readonly marker: IMarker,
    public readonly height: number
  ) {
    super();
  }

  public override dispose(): void {
    this._onDispose.fire();
    super.dispose();
  }
}
