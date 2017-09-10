"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Buffer_1 = require("../Buffer");
var Types_1 = require("./Types");
var GridCache_1 = require("./GridCache");
var BaseRenderLayer_1 = require("./BaseRenderLayer");
var EMOJI_OWNED_CHAR_DATA = [null, '', 0, -1];
var ForegroundRenderLayer = (function (_super) {
    __extends(ForegroundRenderLayer, _super);
    function ForegroundRenderLayer(container, zIndex, colors) {
        var _this = _super.call(this, container, 'fg', zIndex, colors) || this;
        _this._state = new GridCache_1.GridCache();
        return _this;
    }
    ForegroundRenderLayer.prototype.resize = function (terminal, canvasWidth, canvasHeight, charSizeChanged) {
        _super.prototype.resize.call(this, terminal, canvasWidth, canvasHeight, charSizeChanged);
        this._state.clear();
        this._state.resize(terminal.cols, terminal.rows);
    };
    ForegroundRenderLayer.prototype.reset = function (terminal) {
        this._state.clear();
        this.clearAll();
    };
    ForegroundRenderLayer.prototype.onGridChanged = function (terminal, startRow, endRow) {
        if (this._state.cache.length === 0) {
            return;
        }
        for (var y = startRow; y <= endRow; y++) {
            var row = y + terminal.buffer.ydisp;
            var line = terminal.buffer.lines.get(row);
            for (var x = 0; x < terminal.cols; x++) {
                var charData = line[x];
                var code = charData[Buffer_1.CHAR_DATA_CODE_INDEX];
                var char = charData[Buffer_1.CHAR_DATA_CHAR_INDEX];
                var attr = charData[Buffer_1.CHAR_DATA_ATTR_INDEX];
                var width = charData[Buffer_1.CHAR_DATA_WIDTH_INDEX];
                if (width === 0) {
                    this._state.cache[x][y] = null;
                    continue;
                }
                if (code === 32) {
                    if (x > 0) {
                        var previousChar = line[x - 1];
                        if (this._isEmoji(previousChar[Buffer_1.CHAR_DATA_CHAR_INDEX])) {
                            continue;
                        }
                    }
                }
                var state = this._state.cache[x][y];
                if (state && state[Buffer_1.CHAR_DATA_CHAR_INDEX] === char && state[Buffer_1.CHAR_DATA_ATTR_INDEX] === attr) {
                    this._state.cache[x][y] = charData;
                    continue;
                }
                if (state && state[Buffer_1.CHAR_DATA_CODE_INDEX] !== 32) {
                    this._clearChar(x, y);
                }
                this._state.cache[x][y] = charData;
                var flags = attr >> 18;
                if (!code || code === 32 || (flags & Types_1.FLAGS.INVISIBLE)) {
                    continue;
                }
                if (this._isEmoji(char)) {
                    this._state.cache[x][y] = EMOJI_OWNED_CHAR_DATA;
                    if (x < line.length && line[x + 1][Buffer_1.CHAR_DATA_CODE_INDEX] === 32) {
                        width = 2;
                        this._clearChar(x + 1, y);
                        this._state.cache[x + 1][y] = EMOJI_OWNED_CHAR_DATA;
                    }
                }
                var fg = (attr >> 9) & 0x1ff;
                if (flags & Types_1.FLAGS.INVERSE) {
                    fg = attr & 0x1ff;
                    if (fg === 256) {
                        fg = BaseRenderLayer_1.INVERTED_DEFAULT_COLOR;
                    }
                }
                this._ctx.save();
                if (flags & Types_1.FLAGS.BOLD) {
                    this._ctx.font = "bold " + this._ctx.font;
                    if (fg < 8) {
                        fg += 8;
                    }
                }
                if (flags & Types_1.FLAGS.UNDERLINE) {
                    if (fg === BaseRenderLayer_1.INVERTED_DEFAULT_COLOR) {
                        this._ctx.fillStyle = this.colors.background;
                    }
                    else if (fg < 256) {
                        this._ctx.fillStyle = this.colors.ansi[fg];
                    }
                    else {
                        this._ctx.fillStyle = this.colors.foreground;
                    }
                    this.fillBottomLineAtCells(x, y);
                }
                this.drawChar(terminal, char, code, width, x, y, fg, !!(flags & Types_1.FLAGS.BOLD));
                this._ctx.restore();
            }
        }
    };
    ForegroundRenderLayer.prototype._isEmoji = function (char) {
        return char.search(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g) >= 0;
    };
    ForegroundRenderLayer.prototype._clearChar = function (x, y) {
        var colsToClear = 1;
        var state = this._state.cache[x][y];
        if (state && state[Buffer_1.CHAR_DATA_WIDTH_INDEX] === 2) {
            colsToClear = 2;
        }
        this.clearCells(x, y, colsToClear, 1);
    };
    return ForegroundRenderLayer;
}(BaseRenderLayer_1.BaseRenderLayer));
exports.ForegroundRenderLayer = ForegroundRenderLayer;

//# sourceMappingURL=ForegroundRenderLayer.js.map
