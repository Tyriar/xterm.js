/**
 * @module xterm/utils/CharMeasure
 * @license MIT
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventEmitter_js_1 = require("../EventEmitter.js");
/**
 * Utility class that measures the size of a character.
 */
var CharMeasure = (function (_super) {
    __extends(CharMeasure, _super);
    function CharMeasure(parentElement) {
        var _this = _super.call(this) || this;
        _this._parentElement = parentElement;
        return _this;
    }
    Object.defineProperty(CharMeasure.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharMeasure.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    CharMeasure.prototype.measure = function () {
        var oldWidth = this._width;
        var oldHeight = this._height;
        if (!this._measureElement) {
            this._measureElement = document.createElement('span');
            this._measureElement.style.position = 'absolute';
            this._measureElement.style.top = '0';
            this._measureElement.style.left = '-9999em';
            this._measureElement.textContent = 'W';
        }
        this._parentElement.appendChild(this._measureElement);
        var geometry = this._measureElement.getBoundingClientRect();
        this._width = geometry.width;
        this._height = geometry.height;
        this._parentElement.removeChild(this._measureElement);
        if (this._width !== oldWidth || this._height !== oldHeight) {
            this.emit('charsizechanged');
        }
    };
    return CharMeasure;
}(EventEmitter_js_1.EventEmitter));
exports.CharMeasure = CharMeasure;
//# sourceMappingURL=CharMeasure.js.map