"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharAtlas_1 = require("./CharAtlas");
var Buffer_1 = require("../Buffer");
exports.INVERTED_DEFAULT_COLOR = -1;
var BaseRenderLayer = (function () {
    function BaseRenderLayer(container, id, zIndex, colors) {
        this.colors = colors;
        this._canvas = document.createElement('canvas');
        this._canvas.id = "xterm-" + id + "-layer";
        this._canvas.style.zIndex = zIndex.toString();
        this._ctx = this._canvas.getContext('2d');
        this._ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        container.appendChild(this._canvas);
    }
    BaseRenderLayer.prototype.onOptionsChanged = function (terminal) { };
    BaseRenderLayer.prototype.onBlur = function (terminal) { };
    BaseRenderLayer.prototype.onFocus = function (terminal) { };
    BaseRenderLayer.prototype.onCursorMove = function (terminal) { };
    BaseRenderLayer.prototype.onGridChanged = function (terminal, startRow, endRow) { };
    BaseRenderLayer.prototype.onSelectionChanged = function (terminal, start, end) { };
    BaseRenderLayer.prototype.onThemeChanged = function (terminal, colorSet) {
        this._refreshCharAtlas(terminal, colorSet);
    };
    BaseRenderLayer.prototype._refreshCharAtlas = function (terminal, colorSet) {
        var _this = this;
        this._charAtlas = null;
        var result = CharAtlas_1.acquireCharAtlas(terminal, this.colors, this.scaledCharWidth, this.scaledCharHeight);
        if (result instanceof HTMLCanvasElement) {
            this._charAtlas = result;
        }
        else {
            result.then(function (bitmap) { return _this._charAtlas = bitmap; });
        }
    };
    BaseRenderLayer.prototype.resize = function (terminal, dim, charSizeChanged) {
        this.scaledCharWidth = dim.scaledCharWidth;
        this.scaledCharHeight = dim.scaledCharHeight;
        this.scaledLineHeight = dim.scaledLineHeight;
        this.scaledLineDrawY = dim.scaledLineDrawY;
        this._canvas.width = dim.scaledCanvasWidth;
        this._canvas.height = dim.scaledCanvasHeight;
        this._canvas.style.width = dim.canvasWidth + "px";
        this._canvas.style.height = dim.canvasHeight + "px";
        if (charSizeChanged) {
            this._refreshCharAtlas(terminal, this.colors);
        }
    };
    BaseRenderLayer.prototype.fillCells = function (x, y, width, height) {
        this._ctx.fillRect(x * this.scaledCharWidth, y * this.scaledLineHeight, width * this.scaledCharWidth, height * this.scaledLineHeight);
    };
    BaseRenderLayer.prototype.fillBottomLineAtCells = function (x, y, width) {
        if (width === void 0) { width = 1; }
        this._ctx.fillRect(x * this.scaledCharWidth, (y + 1) * this.scaledLineHeight - window.devicePixelRatio - 1, width * this.scaledCharWidth, window.devicePixelRatio);
    };
    BaseRenderLayer.prototype.fillLeftLineAtCell = function (x, y) {
        this._ctx.fillRect(x * this.scaledCharWidth, y * this.scaledLineHeight, window.devicePixelRatio, this.scaledLineHeight);
    };
    BaseRenderLayer.prototype.strokeRectAtCell = function (x, y, width, height) {
        this._ctx.lineWidth = window.devicePixelRatio;
        this._ctx.strokeRect(x * this.scaledCharWidth + window.devicePixelRatio / 2, y * this.scaledLineHeight + (window.devicePixelRatio / 2), (width * this.scaledCharWidth) - window.devicePixelRatio, (height * this.scaledLineHeight) - window.devicePixelRatio);
    };
    BaseRenderLayer.prototype.clearAll = function () {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };
    BaseRenderLayer.prototype.clearCells = function (x, y, width, height) {
        this._ctx.clearRect(x * this.scaledCharWidth, y * this.scaledLineHeight, width * this.scaledCharWidth, height * this.scaledLineHeight);
    };
    BaseRenderLayer.prototype.fillCharTrueColor = function (terminal, charData, x, y) {
        this._ctx.font = terminal.options.fontSize * window.devicePixelRatio + "px " + terminal.options.fontFamily;
        this._ctx.textBaseline = 'top';
        this._ctx.beginPath();
        this._ctx.rect(x * this.scaledCharWidth, y * this.scaledLineHeight + this.scaledLineDrawY, charData[Buffer_1.CHAR_DATA_WIDTH_INDEX] * this.scaledCharWidth, this.scaledCharHeight);
        this._ctx.clip();
        this._ctx.fillText(charData[Buffer_1.CHAR_DATA_CHAR_INDEX], x * this.scaledCharWidth, y * this.scaledCharHeight);
    };
    BaseRenderLayer.prototype.drawChar = function (terminal, char, code, width, x, y, fg, bold) {
        if (width === 2) {
            this.clearCells(x + 1, y, 1, 1);
        }
        var colorIndex = 0;
        if (fg < 256) {
            colorIndex = fg + 2;
        }
        else {
            if (bold) {
                colorIndex = 1;
            }
        }
        var isAscii = code < 256;
        var isBasicColor = (colorIndex > 1 && fg < 16);
        var isDefaultColor = fg >= 256;
        if (isAscii && (isBasicColor || isDefaultColor)) {
            var charAtlasCellWidth = this.scaledCharWidth + CharAtlas_1.CHAR_ATLAS_CELL_SPACING;
            var charAtlasCellHeight = this.scaledCharHeight + CharAtlas_1.CHAR_ATLAS_CELL_SPACING;
            this._ctx.drawImage(this._charAtlas, code * charAtlasCellWidth, colorIndex * charAtlasCellHeight, this.scaledCharWidth, this.scaledCharHeight, x * this.scaledCharWidth, y * this.scaledLineHeight + this.scaledLineDrawY, this.scaledCharWidth, this.scaledCharHeight);
        }
        else {
            this._drawUncachedChar(terminal, char, width, fg, x, y);
        }
    };
    BaseRenderLayer.prototype._drawUncachedChar = function (terminal, char, width, fg, x, y) {
        this._ctx.save();
        this._ctx.font = terminal.options.fontSize * window.devicePixelRatio + "px " + terminal.options.fontFamily;
        this._ctx.textBaseline = 'top';
        if (fg === exports.INVERTED_DEFAULT_COLOR) {
            this._ctx.fillStyle = this.colors.background;
        }
        else if (fg < 256) {
            this._ctx.fillStyle = this.colors.ansi[fg];
        }
        else {
            this._ctx.fillStyle = this.colors.foreground;
        }
        this._ctx.beginPath();
        this._ctx.rect(x * this.scaledCharWidth, y * this.scaledLineHeight + this.scaledLineDrawY, width * this.scaledCharWidth, this.scaledCharHeight);
        this._ctx.clip();
        this._ctx.fillText(char, x * this.scaledCharWidth, y * this.scaledLineHeight + this.scaledLineDrawY);
        this._ctx.restore();
    };
    return BaseRenderLayer;
}());
exports.BaseRenderLayer = BaseRenderLayer;

//# sourceMappingURL=BaseRenderLayer.js.map
