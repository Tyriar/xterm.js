"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenDprMonitor = (function () {
    function ScreenDprMonitor() {
    }
    ScreenDprMonitor.prototype.setListener = function (listener) {
        var _this = this;
        if (this._listener) {
            this.clearListener();
        }
        this._listener = listener;
        this._outerListener = function () {
            _this._listener(window.devicePixelRatio, _this._currentDevicePixelRatio);
            _this._updateDpr();
        };
        this._updateDpr();
    };
    ScreenDprMonitor.prototype._updateDpr = function () {
        if (this._minMediaMatchList) {
            this._minMediaMatchList.removeListener(this._outerListener);
        }
        if (this._maxMediaMatchList) {
            this._maxMediaMatchList.removeListener(this._outerListener);
        }
        this._currentDevicePixelRatio = window.devicePixelRatio;
        this._minMediaMatchList = window.matchMedia("screen and (-webkit-min-device-pixel-ratio: " + window.devicePixelRatio + ")");
        this._maxMediaMatchList = window.matchMedia("screen and (-webkit-max-device-pixel-ratio: " + window.devicePixelRatio + ")");
        this._minMediaMatchList.addListener(this._outerListener);
        this._maxMediaMatchList.addListener(this._outerListener);
    };
    ScreenDprMonitor.prototype.clearListener = function () {
        if (!this._listener) {
            return;
        }
        this._minMediaMatchList.removeListener(this._outerListener);
        this._maxMediaMatchList.removeListener(this._outerListener);
        this._listener = null;
        this._outerListener = null;
    };
    return ScreenDprMonitor;
}());
exports.ScreenDprMonitor = ScreenDprMonitor;

//# sourceMappingURL=ScreenDprMonitor.js.map
