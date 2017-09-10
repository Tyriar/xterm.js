"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchHelper_1 = require("./SearchHelper");
(function (addon) {
    if (typeof window !== 'undefined' && 'Terminal' in window) {
        addon(window.Terminal);
    }
    else if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = addon(require('../../Terminal').Terminal);
    }
    else if (typeof define === 'function') {
        define(['../../xterm'], addon);
    }
})(function (Terminal) {
    Terminal.prototype.findNext = function (term) {
        if (!this._searchHelper) {
            this.searchHelper = new SearchHelper_1.SearchHelper(this);
        }
        return this.searchHelper.findNext(term);
    };
    Terminal.prototype.findPrevious = function (term) {
        if (!this._searchHelper) {
            this.searchHelper = new SearchHelper_1.SearchHelper(this);
        }
        return this.searchHelper.findPrevious(term);
    };
});

//# sourceMappingURL=search.js.map
