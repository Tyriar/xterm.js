"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharAtlas_1 = require("./CharAtlas");
var Buffer_1 = require("../Buffer");
exports.INVERTED_DEFAULT_COLOR = -1;
var BaseRenderLayer = (function () {
    function BaseRenderLayer(container, id, zIndex, _alpha, _colors) {
        this._alpha = _alpha;
        this._colors = _colors;
        this._canvas = document.createElement('canvas');
        this._canvas.id = "xterm-" + id + "-layer";
        this._canvas.style.zIndex = zIndex.toString();
        this._ctx = this._canvas.getContext('2d', { alpha: _alpha });
        this._ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        if (!_alpha) {
            this.clearAll();
        }
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
        if (this._scaledCharWidth <= 0 && this._scaledCharHeight <= 0) {
            return;
        }
        this._charAtlas = null;
        var result = CharAtlas_1.acquireCharAtlas(terminal, this._colors, this._scaledCharWidth, this._scaledCharHeight);
        if (result instanceof HTMLCanvasElement) {
            this._charAtlas = result;
        }
        else {
            result.then(function (bitmap) { return _this._charAtlas = bitmap; });
        }
    };
    BaseRenderLayer.prototype.resize = function (terminal, dim, charSizeChanged) {
        this._scaledCharWidth = dim.scaledCharWidth;
        this._scaledCharHeight = dim.scaledCharHeight;
        this._scaledLineHeight = dim.scaledLineHeight;
        this._scaledLineDrawY = dim.scaledLineDrawY;
        this._canvas.width = dim.scaledCanvasWidth;
        this._canvas.height = dim.scaledCanvasHeight;
        this._canvas.style.width = dim.canvasWidth + "px";
        this._canvas.style.height = dim.canvasHeight + "px";
        if (!this._alpha) {
            this.clearAll();
        }
        if (charSizeChanged) {
            this._refreshCharAtlas(terminal, this._colors);
        }
    };
    BaseRenderLayer.prototype.fillCells = function (x, y, width, height) {
        this._ctx.fillRect(x * this._scaledCharWidth, y * this._scaledLineHeight, width * this._scaledCharWidth, height * this._scaledLineHeight);
    };
    BaseRenderLayer.prototype.fillBottomLineAtCells = function (x, y, width) {
        if (width === void 0) { width = 1; }
        this._ctx.fillRect(x * this._scaledCharWidth, (y + 1) * this._scaledLineHeight - window.devicePixelRatio - 1, width * this._scaledCharWidth, window.devicePixelRatio);
    };
    BaseRenderLayer.prototype.fillLeftLineAtCell = function (x, y) {
        this._ctx.fillRect(x * this._scaledCharWidth, y * this._scaledLineHeight, window.devicePixelRatio, this._scaledLineHeight);
    };
    BaseRenderLayer.prototype.strokeRectAtCell = function (x, y, width, height) {
        this._ctx.lineWidth = window.devicePixelRatio;
        this._ctx.strokeRect(x * this._scaledCharWidth + window.devicePixelRatio / 2, y * this._scaledLineHeight + (window.devicePixelRatio / 2), width * this._scaledCharWidth - window.devicePixelRatio, (height * this._scaledLineHeight) - window.devicePixelRatio);
    };
    BaseRenderLayer.prototype.clearAll = function () {
        if (this._alpha) {
            this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
        else {
            this._ctx.fillStyle = this._colors.background;
            this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        }
    };
    BaseRenderLayer.prototype.clearCells = function (x, y, width, height) {
        if (this._alpha) {
            this._ctx.clearRect(x * this._scaledCharWidth, y * this._scaledLineHeight, width * this._scaledCharWidth, height * this._scaledLineHeight);
        }
        else {
            this._ctx.fillStyle = this._colors.background;
            this._ctx.fillRect(x * this._scaledCharWidth, y * this._scaledLineHeight, width * this._scaledCharWidth, height * this._scaledLineHeight);
        }
    };
    BaseRenderLayer.prototype.fillCharTrueColor = function (terminal, charData, x, y) {
        this._ctx.font = terminal.options.fontSize * window.devicePixelRatio + "px " + terminal.options.fontFamily;
        this._ctx.textBaseline = 'top';
        this._ctx.beginPath();
        this._ctx.rect(x * this._scaledCharWidth, y * this._scaledLineHeight + this._scaledLineDrawY, charData[Buffer_1.CHAR_DATA_WIDTH_INDEX] * this._scaledCharWidth, this._scaledCharHeight);
        this._ctx.clip();
        this._ctx.fillText(charData[Buffer_1.CHAR_DATA_CHAR_INDEX], x * this._scaledCharWidth, y * this._scaledCharHeight);
    };
    BaseRenderLayer.prototype.drawChar = function (terminal, char, code, width, x, y, fg, bg, bold) {
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
        var isDefaultBackground = bg >= 256;
        if (this._charAtlas && isAscii && (isBasicColor || isDefaultColor) && isDefaultBackground) {
            var charAtlasCellWidth = this._scaledCharWidth + CharAtlas_1.CHAR_ATLAS_CELL_SPACING;
            var charAtlasCellHeight = this._scaledCharHeight + CharAtlas_1.CHAR_ATLAS_CELL_SPACING;
            this._ctx.drawImage(this._charAtlas, code * charAtlasCellWidth, colorIndex * charAtlasCellHeight, charAtlasCellWidth, this._scaledCharHeight, x * this._scaledCharWidth, y * this._scaledLineHeight + this._scaledLineDrawY, this._scaledCharWidth, this._scaledCharHeight);
        }
        else {
            this._drawUncachedChar(terminal, char, width, fg, x, y, bold);
        }
    };
    BaseRenderLayer.prototype._drawUncachedChar = function (terminal, char, width, fg, x, y, bold) {
        this._ctx.save();
        this._ctx.font = terminal.options.fontSize * window.devicePixelRatio + "px " + terminal.options.fontFamily;
        if (bold) {
            this._ctx.font = "bold " + this._ctx.font;
        }
        this._ctx.textBaseline = 'top';
        if (fg === exports.INVERTED_DEFAULT_COLOR) {
            this._ctx.fillStyle = this._colors.background;
        }
        else if (fg < 256) {
            this._ctx.fillStyle = this._colors.ansi[fg];
        }
        else {
            this._ctx.fillStyle = this._colors.foreground;
        }
        this._ctx.beginPath();
        this._ctx.rect(0, y * this._scaledLineHeight + this._scaledLineDrawY, terminal.cols * this._scaledCharWidth, this._scaledCharHeight);
        this._ctx.clip();
        this._ctx.fillText(char, x * this._scaledCharWidth, y * this._scaledLineHeight + this._scaledLineDrawY);
        this._ctx.restore();
    };
    return BaseRenderLayer;
}());
exports.BaseRenderLayer = BaseRenderLayer;

//# sourceMappingURL=BaseRenderLayer.js.map
