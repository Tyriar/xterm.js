"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Browser_1 = require("../utils/Browser");
exports.CHAR_ATLAS_CELL_SPACING = 1;
var charAtlasCache = [];
function acquireCharAtlas(terminal, colors, scaledCharWidth, scaledCharHeight) {
    var newConfig = generateConfig(scaledCharWidth, scaledCharHeight, terminal, colors);
    for (var i = 0; i < charAtlasCache.length; i++) {
        var entry = charAtlasCache[i];
        var ownedByIndex = entry.ownedBy.indexOf(terminal);
        if (ownedByIndex >= 0) {
            if (configEquals(entry.config, newConfig)) {
                return entry.bitmap;
            }
            else {
                if (entry.ownedBy.length === 1) {
                    charAtlasCache.splice(i, 1);
                }
                else {
                    entry.ownedBy.splice(ownedByIndex, 1);
                }
                break;
            }
        }
    }
    for (var i = 0; i < charAtlasCache.length; i++) {
        var entry = charAtlasCache[i];
        if (configEquals(entry.config, newConfig)) {
            entry.ownedBy.push(terminal);
            return entry.bitmap;
        }
    }
    var newEntry = {
        bitmap: generator.generate(scaledCharWidth, scaledCharHeight, terminal.options.fontSize, terminal.options.fontFamily, colors.foreground, colors.ansi),
        config: newConfig,
        ownedBy: [terminal]
    };
    charAtlasCache.push(newEntry);
    return newEntry.bitmap;
}
exports.acquireCharAtlas = acquireCharAtlas;
function generateConfig(scaledCharWidth, scaledCharHeight, terminal, colors) {
    var clonedColors = {
        foreground: colors.foreground,
        background: null,
        cursor: null,
        cursorAccent: null,
        selection: null,
        ansi: colors.ansi.slice(0, 16)
    };
    return {
        scaledCharWidth: scaledCharWidth,
        scaledCharHeight: scaledCharHeight,
        fontFamily: terminal.options.fontFamily,
        fontSize: terminal.options.fontSize,
        colors: clonedColors
    };
}
function configEquals(a, b) {
    for (var i = 0; i < a.colors.ansi.length; i++) {
        if (a.colors.ansi[i] !== b.colors.ansi[i]) {
            return false;
        }
    }
    return a.fontFamily === b.fontFamily &&
        a.fontSize === b.fontSize &&
        a.scaledCharWidth === b.scaledCharWidth &&
        a.scaledCharHeight === b.scaledCharHeight &&
        a.colors.foreground === b.colors.foreground;
}
var generator;
function initialize(document) {
    if (!generator) {
        generator = new CharAtlasGenerator(document);
    }
}
exports.initialize = initialize;
var CharAtlasGenerator = (function () {
    function CharAtlasGenerator(_document) {
        this._document = _document;
        this._canvas = this._document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
        this._ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    CharAtlasGenerator.prototype.generate = function (scaledCharWidth, scaledCharHeight, fontSize, fontFamily, foreground, ansiColors) {
        var cellWidth = scaledCharWidth + exports.CHAR_ATLAS_CELL_SPACING;
        var cellHeight = scaledCharHeight + exports.CHAR_ATLAS_CELL_SPACING;
        this._canvas.width = 255 * cellWidth;
        this._canvas.height = (2 + 16) * cellHeight;
        this._ctx.save();
        this._ctx.fillStyle = foreground;
        this._ctx.font = fontSize * window.devicePixelRatio + "px " + fontFamily;
        this._ctx.textBaseline = 'top';
        for (var i = 0; i < 256; i++) {
            this._ctx.fillText(String.fromCharCode(i), i * cellWidth, 0);
        }
        this._ctx.save();
        this._ctx.font = "bold " + this._ctx.font;
        for (var i = 0; i < 256; i++) {
            this._ctx.fillText(String.fromCharCode(i), i * cellWidth, cellHeight);
        }
        this._ctx.restore();
        this._ctx.font = fontSize * window.devicePixelRatio + "px " + fontFamily;
        for (var colorIndex = 0; colorIndex < 16; colorIndex++) {
            if (colorIndex === 8) {
                this._ctx.font = "bold " + this._ctx.font;
            }
            var y = (colorIndex + 2) * cellHeight;
            for (var i = 0; i < 256; i++) {
                this._ctx.fillStyle = ansiColors[colorIndex];
                this._ctx.fillText(String.fromCharCode(i), i * cellWidth, y);
            }
        }
        this._ctx.restore();
        var charAtlasImageData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
        if (!('createImageBitmap' in window) || Browser_1.isFirefox) {
            var result = this._canvas;
            this._canvas = this._document.createElement('canvas');
            this._ctx = this._canvas.getContext('2d');
            this._ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            return result;
        }
        var promise = window.createImageBitmap(charAtlasImageData);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        return promise;
    };
    return CharAtlasGenerator;
}());

//# sourceMappingURL=CharAtlas.js.map
