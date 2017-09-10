"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackgroundRenderLayer_1 = require("./BackgroundRenderLayer");
var ForegroundRenderLayer_1 = require("./ForegroundRenderLayer");
var SelectionRenderLayer_1 = require("./SelectionRenderLayer");
var CursorRenderLayer_1 = require("./CursorRenderLayer");
var ColorManager_1 = require("./ColorManager");
var LinkRenderLayer_1 = require("./LinkRenderLayer");
var Renderer = (function () {
    function Renderer(_terminal) {
        this._terminal = _terminal;
        this._refreshRowsQueue = [];
        this._refreshAnimationFrame = null;
        this._colorManager = new ColorManager_1.ColorManager();
        this._renderLayers = [
            new BackgroundRenderLayer_1.BackgroundRenderLayer(this._terminal.element, 0, this._colorManager.colors),
            new SelectionRenderLayer_1.SelectionRenderLayer(this._terminal.element, 1, this._colorManager.colors),
            new ForegroundRenderLayer_1.ForegroundRenderLayer(this._terminal.element, 2, this._colorManager.colors),
            new LinkRenderLayer_1.LinkRenderLayer(this._terminal.element, 3, this._colorManager.colors, this._terminal),
            new CursorRenderLayer_1.CursorRenderLayer(this._terminal.element, 4, this._colorManager.colors)
        ];
        this._devicePixelRatio = window.devicePixelRatio;
    }
    Renderer.prototype.onWindowResize = function (devicePixelRatio) {
        if (this._devicePixelRatio !== devicePixelRatio) {
            this._devicePixelRatio = devicePixelRatio;
            this.onResize(this._terminal.cols, this._terminal.rows, true);
        }
    };
    Renderer.prototype.setTheme = function (theme) {
        var _this = this;
        this._colorManager.setTheme(theme);
        this._renderLayers.forEach(function (l) {
            l.onThemeChanged(_this._terminal, _this._colorManager.colors);
            l.reset(_this._terminal);
        });
        this._terminal.refresh(0, this._terminal.rows - 1);
        return this._colorManager.colors;
    };
    Renderer.prototype.onResize = function (cols, rows, didCharSizeChange) {
        var _this = this;
        if (!this._terminal.charMeasure.width || !this._terminal.charMeasure.height) {
            return;
        }
        var width = this._terminal.charMeasure.width * cols;
        var height = Math.floor(this._terminal.charMeasure.height * this._terminal.options.lineHeight) * rows;
        this._renderLayers.forEach(function (l) { return l.resize(_this._terminal, width, height, didCharSizeChange); });
        this._terminal.refresh(0, this._terminal.rows - 1);
    };
    Renderer.prototype.onCharSizeChanged = function () {
        this.onResize(this._terminal.cols, this._terminal.rows, true);
    };
    Renderer.prototype.onBlur = function () {
        var _this = this;
        this._renderLayers.forEach(function (l) { return l.onBlur(_this._terminal); });
    };
    Renderer.prototype.onFocus = function () {
        var _this = this;
        this._renderLayers.forEach(function (l) { return l.onFocus(_this._terminal); });
    };
    Renderer.prototype.onSelectionChanged = function (start, end) {
        var _this = this;
        this._renderLayers.forEach(function (l) { return l.onSelectionChanged(_this._terminal, start, end); });
    };
    Renderer.prototype.onCursorMove = function () {
        var _this = this;
        this._renderLayers.forEach(function (l) { return l.onCursorMove(_this._terminal); });
    };
    Renderer.prototype.onOptionsChanged = function () {
        var _this = this;
        this._renderLayers.forEach(function (l) { return l.onOptionsChanged(_this._terminal); });
    };
    Renderer.prototype.clear = function () {
        var _this = this;
        this._renderLayers.forEach(function (l) { return l.reset(_this._terminal); });
    };
    Renderer.prototype.queueRefresh = function (start, end) {
        this._refreshRowsQueue.push({ start: start, end: end });
        if (!this._refreshAnimationFrame) {
            this._refreshAnimationFrame = window.requestAnimationFrame(this._refreshLoop.bind(this));
        }
    };
    Renderer.prototype._refreshLoop = function () {
        var _this = this;
        var start;
        var end;
        if (this._refreshRowsQueue.length > 4) {
            start = 0;
            end = this._terminal.rows - 1;
        }
        else {
            start = this._refreshRowsQueue[0].start;
            end = this._refreshRowsQueue[0].end;
            for (var i = 1; i < this._refreshRowsQueue.length; i++) {
                if (this._refreshRowsQueue[i].start < start) {
                    start = this._refreshRowsQueue[i].start;
                }
                if (this._refreshRowsQueue[i].end > end) {
                    end = this._refreshRowsQueue[i].end;
                }
            }
        }
        this._refreshRowsQueue = [];
        this._refreshAnimationFrame = null;
        start = Math.max(start, 0);
        end = Math.min(end, this._terminal.rows - 1);
        this._renderLayers.forEach(function (l) { return l.onGridChanged(_this._terminal, start, end); });
        this._terminal.emit('refresh', { start: start, end: end });
    };
    return Renderer;
}());
exports.Renderer = Renderer;

//# sourceMappingURL=Renderer.js.map
