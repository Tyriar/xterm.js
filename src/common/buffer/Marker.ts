/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { EventEmitter, IEvent } from 'common/EventEmitter';
import { Disposable } from 'common/Lifecycle';
import { IMarker } from 'common/Types';

export class Marker extends Disposable implements IMarker {
  private static _nextId = 1;

  private _id: number = Marker._nextId++;
  isDisposed: boolean = false;

  get id(): number { return this._id; }

  private _onDispose = new EventEmitter<void>();
  get onDispose(): IEvent<void> { return this._onDispose.event; }

  constructor(
    public line: number
  ) {
    super();
  }

  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this.isDisposed = true;
    this.line = -1;
    // Emit before super.dispose such that dispose listeners get a change to react
    this._onDispose.fire();
  }
}
