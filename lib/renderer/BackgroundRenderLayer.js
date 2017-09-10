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
var GridCache_1 = require("./GridCache");
var Types_1 = require("./Types");
var BaseRenderLayer_1 = require("./BaseRenderLayer");
var BackgroundRenderLayer = (function (_super) {
    __extends(BackgroundRenderLayer, _super);
    function BackgroundRenderLayer(container, zIndex, colors) {
        var _this = _super.call(this, container, 'bg', zIndex, colors) || this;
        _this._state = new GridCache_1.GridCache();
        return _this;
    }
    BackgroundRenderLayer.prototype.resize = function (terminal, dim, charSizeChanged) {
        _super.prototype.resize.call(this, terminal, dim, charSizeChanged);
        this._state.clear();
        this._state.resize(terminal.cols, terminal.rows);
    };
    BackgroundRenderLayer.prototype.reset = function (terminal) {
        this._state.clear();
        this.clearAll();
    };
    BackgroundRenderLayer.prototype.onGridChanged = function (terminal, startRow, endRow) {
        if (this._state.cache.length === 0) {
            return;
        }
        for (var y = startRow; y <= endRow; y++) {
            var row = y + terminal.buffer.ydisp;
            var line = terminal.buffer.lines.get(row);
            for (var x = 0; x < terminal.cols; x++) {
                var attr = line[x][Buffer_1.CHAR_DATA_ATTR_INDEX];
                var bg = attr & 0x1ff;
                var flags = attr >> 18;
                if (flags & Types_1.FLAGS.INVERSE) {
                    bg = (attr >> 9) & 0x1ff;
                    if (bg === 257) {
                        bg = BaseRenderLayer_1.INVERTED_DEFAULT_COLOR;
                    }
                }
                var cellState = this._state.cache[x][y];
                var needsRefresh = (bg < 256 && cellState !== bg) || cellState !== null;
                if (needsRefresh) {
                    if (bg < 256) {
                        this._ctx.save();
                        this._ctx.fillStyle = (bg === BaseRenderLayer_1.INVERTED_DEFAULT_COLOR ? this.colors.foreground : this.colors.ansi[bg]);
                        this.fillCells(x, y, 1, 1);
                        this._ctx.restore();
                        this._state.cache[x][y] = bg;
                    }
                    else {
                        this.clearCells(x, y, 1, 1);
                        this._state.cache[x][y] = null;
                    }
                }
            }
        }
    };
    return BackgroundRenderLayer;
}(BaseRenderLayer_1.BaseRenderLayer));
exports.BackgroundRenderLayer = BackgroundRenderLayer;

//# sourceMappingURL=BackgroundRenderLayer.js.map
