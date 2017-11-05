"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HOVER_DURATION = 500;
var MouseZoneManager = (function () {
    function MouseZoneManager(_terminal) {
        var _this = this;
        this._terminal = _terminal;
        this._zones = [];
        this._areZonesActive = false;
        this._tooltipTimeout = null;
        this._currentZone = null;
        this._lastHoverCoords = [null, null];
        this._terminal.element.addEventListener('mousedown', function (e) { return _this._onMouseDown(e); });
        this._mouseMoveListener = function (e) { return _this._onMouseMove(e); };
        this._clickListener = function (e) { return _this._onClick(e); };
    }
    MouseZoneManager.prototype.add = function (zone) {
        this._zones.push(zone);
        if (this._zones.length === 1) {
            this._activate();
        }
    };
    MouseZoneManager.prototype.clearAll = function (start, end) {
        if (this._zones.length === 0) {
            return;
        }
        if (!end) {
            start = 0;
            end = this._terminal.rows - 1;
        }
        for (var i = 0; i < this._zones.length; i++) {
            var zone = this._zones[i];
            if (zone.y > start && zone.y <= end + 1) {
                if (this._currentZone && this._currentZone === zone) {
                    this._currentZone.leaveCallback();
                    this._currentZone = null;
                }
                this._zones.splice(i--, 1);
            }
        }
        if (this._zones.length === 0) {
            this._deactivate();
        }
    };
    MouseZoneManager.prototype._activate = function () {
        if (!this._areZonesActive) {
            this._areZonesActive = true;
            this._terminal.element.addEventListener('mousemove', this._mouseMoveListener);
            this._terminal.element.addEventListener('click', this._clickListener);
        }
    };
    MouseZoneManager.prototype._deactivate = function () {
        if (this._areZonesActive) {
            this._areZonesActive = false;
            this._terminal.element.removeEventListener('mousemove', this._mouseMoveListener);
            this._terminal.element.removeEventListener('click', this._clickListener);
        }
    };
    MouseZoneManager.prototype._onMouseMove = function (e) {
        if (this._lastHoverCoords[0] !== e.pageX || this._lastHoverCoords[1] !== e.pageY) {
            this._onHover(e);
            this._lastHoverCoords = [e.pageX, e.pageY];
        }
    };
    MouseZoneManager.prototype._onHover = function (e) {
        var _this = this;
        var zone = this._findZoneEventAt(e);
        if (zone === this._currentZone) {
            return;
        }
        if (this._currentZone) {
            this._currentZone.leaveCallback();
            this._currentZone = null;
            if (this._tooltipTimeout) {
                clearTimeout(this._tooltipTimeout);
            }
        }
        if (!zone) {
            return;
        }
        this._currentZone = zone;
        if (zone.hoverCallback) {
            zone.hoverCallback(e);
        }
        this._tooltipTimeout = setTimeout(function () { return _this._onTooltip(e); }, HOVER_DURATION);
    };
    MouseZoneManager.prototype._onTooltip = function (e) {
        this._tooltipTimeout = null;
        var zone = this._findZoneEventAt(e);
        if (zone && zone.tooltipCallback) {
            zone.tooltipCallback(e);
        }
    };
    MouseZoneManager.prototype._onMouseDown = function (e) {
        if (!this._areZonesActive) {
            return;
        }
        var zone = this._findZoneEventAt(e);
        if (zone) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    };
    MouseZoneManager.prototype._onClick = function (e) {
        var zone = this._findZoneEventAt(e);
        if (zone) {
            zone.clickCallback(e);
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    };
    MouseZoneManager.prototype._findZoneEventAt = function (e) {
        var coords = this._terminal.mouseHelper.getCoords(e, this._terminal.element, this._terminal.charMeasure, this._terminal.options.lineHeight, this._terminal.cols, this._terminal.rows);
        if (!coords) {
            return null;
        }
        for (var i = 0; i < this._zones.length; i++) {
            var zone = this._zones[i];
            if (zone.y === coords[1] && zone.x1 <= coords[0] && zone.x2 > coords[0]) {
                return zone;
            }
        }
        ;
        return null;
    };
    return MouseZoneManager;
}());
exports.MouseZoneManager = MouseZoneManager;
var MouseZone = (function () {
    function MouseZone(x1, x2, y, clickCallback, hoverCallback, tooltipCallback, leaveCallback) {
        this.x1 = x1;
        this.x2 = x2;
        this.y = y;
        this.clickCallback = clickCallback;
        this.hoverCallback = hoverCallback;
        this.tooltipCallback = tooltipCallback;
        this.leaveCallback = leaveCallback;
    }
    return MouseZone;
}());
exports.MouseZone = MouseZone;

//# sourceMappingURL=MouseZoneManager.js.map
