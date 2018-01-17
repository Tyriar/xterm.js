"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Browser_1 = require("./utils/Browser");
var RenderDebouncer_1 = require("./utils/RenderDebouncer");
var Dom_1 = require("./utils/Dom");
var MAX_ROWS_TO_READ = 20;
var ACTIVE_ITEM_ID_PREFIX = 'xterm-active-item-';
var AccessibilityManager = (function () {
    function AccessibilityManager(_terminal) {
        var _this = this;
        this._terminal = _terminal;
        this._rowElements = [];
        this._liveRegionLineCount = 0;
        this._disposables = [];
        this._charsToConsume = [];
        this._accessibilityTreeRoot = document.createElement('div');
        this._accessibilityTreeRoot.classList.add('xterm-accessibility');
        this._rowContainer = document.createElement('div');
        this._rowContainer.classList.add('xterm-accessibility-tree');
        for (var i = 0; i < this._terminal.rows; i++) {
            this._rowElements[i] = this._createAccessibilityTreeNode();
            this._rowContainer.appendChild(this._rowElements[i]);
        }
        this._refreshRowsDimensions();
        this._accessibilityTreeRoot.appendChild(this._rowContainer);
        this._renderRowsDebouncer = new RenderDebouncer_1.RenderDebouncer(this._terminal, this._renderRows.bind(this));
        this._refreshRows();
        this._navigationMode = new NavigationMode(this._terminal, this._rowContainer, this._rowElements, this);
        this._liveRegion = document.createElement('div');
        this._liveRegion.classList.add('live-region');
        this._liveRegion.setAttribute('aria-live', 'assertive');
        this._accessibilityTreeRoot.appendChild(this._liveRegion);
        this._terminal.element.appendChild(this._accessibilityTreeRoot);
        this._disposables.push(this._renderRowsDebouncer);
        this._disposables.push(this._navigationMode);
        this._disposables.push(this._terminal.addDisposableListener('resize', function (data) { return _this._onResize(data.cols, data.rows); }));
        this._disposables.push(this._terminal.addDisposableListener('refresh', function (data) { return _this._refreshRows(data.start, data.end); }));
        this._disposables.push(this._terminal.addDisposableListener('scroll', function (data) { return _this._refreshRows(); }));
        this._disposables.push(this._terminal.addDisposableListener('a11y.char', function (char) { return _this._onChar(char); }));
        this._disposables.push(this._terminal.addDisposableListener('linefeed', function () { return _this._onChar('\n'); }));
        this._disposables.push(this._terminal.addDisposableListener('a11y.tab', function (spaceCount) { return _this._onTab(spaceCount); }));
        this._disposables.push(this._terminal.addDisposableListener('charsizechanged', function () { return _this._refreshRowsDimensions(); }));
        this._disposables.push(this._terminal.addDisposableListener('key', function (keyChar) { return _this._onKey(keyChar); }));
        this._disposables.push(this._terminal.addDisposableListener('blur', function () { return _this._clearLiveRegion(); }));
        this._disposables.push(this._terminal.addDisposableListener('dprchange', function () { return _this._refreshRowsDimensions(); }));
        this._disposables.push(Dom_1.addDisposableListener(window, 'resize', function () { return _this._refreshRowsDimensions(); }));
    }
    AccessibilityManager.prototype.dispose = function () {
        this._terminal.element.removeChild(this._accessibilityTreeRoot);
        this._disposables.forEach(function (d) { return d.dispose(); });
        this._disposables = null;
        this._accessibilityTreeRoot = null;
        this._rowContainer = null;
        this._liveRegion = null;
        this._rowContainer = null;
        this._rowElements = null;
    };
    Object.defineProperty(AccessibilityManager.prototype, "isNavigationModeActive", {
        get: function () {
            return this._navigationMode.isActive;
        },
        enumerable: true,
        configurable: true
    });
    AccessibilityManager.prototype.enterNavigationMode = function () {
        this._navigationMode.enter();
    };
    AccessibilityManager.prototype._onResize = function (cols, rows) {
        for (var i = this._rowContainer.children.length; i < this._terminal.rows; i++) {
            this._rowElements[i] = this._createAccessibilityTreeNode();
            this._rowContainer.appendChild(this._rowElements[i]);
        }
        while (this._rowElements.length > rows) {
            this._rowContainer.removeChild(this._rowElements.pop());
        }
        this._refreshRowsDimensions();
    };
    AccessibilityManager.prototype._createAccessibilityTreeNode = function () {
        var element = document.createElement('div');
        element.setAttribute('role', 'menuitem');
        return element;
    };
    AccessibilityManager.prototype._onTab = function (spaceCount) {
        for (var i = 0; i < spaceCount; i++) {
            this._onChar(' ');
        }
    };
    AccessibilityManager.prototype._onChar = function (char) {
        var _this = this;
        if (this._liveRegionLineCount < MAX_ROWS_TO_READ + 1) {
            if (this._charsToConsume.length > 0) {
                var shiftedChar = this._charsToConsume.shift();
                if (shiftedChar !== char) {
                    if (char === ' ') {
                        this._liveRegion.innerHTML += '&nbsp;';
                    }
                    else {
                        this._liveRegion.textContent += char;
                    }
                }
            }
            else {
                if (char === ' ') {
                    this._liveRegion.innerHTML += '&nbsp;';
                }
                else
                    this._liveRegion.textContent += char;
            }
            if (char === '\n') {
                this._liveRegionLineCount++;
                if (this._liveRegionLineCount === MAX_ROWS_TO_READ + 1) {
                    this._liveRegion.textContent += 'Too much output to announce, navigate to rows manually to read';
                }
            }
            if (Browser_1.isMac) {
                if (this._liveRegion.textContent.length > 0 && !this._liveRegion.parentNode) {
                    setTimeout(function () {
                        _this._accessibilityTreeRoot.appendChild(_this._liveRegion);
                    }, 0);
                }
            }
        }
    };
    AccessibilityManager.prototype._clearLiveRegion = function () {
        this._liveRegion.textContent = '';
        this._liveRegionLineCount = 0;
        if (Browser_1.isMac) {
            if (this._liveRegion.parentNode) {
                this._accessibilityTreeRoot.removeChild(this._liveRegion);
            }
        }
    };
    AccessibilityManager.prototype._onKey = function (keyChar) {
        this._clearLiveRegion();
        this._charsToConsume.push(keyChar);
    };
    AccessibilityManager.prototype._refreshRows = function (start, end) {
        this._renderRowsDebouncer.refresh(start, end);
    };
    AccessibilityManager.prototype._renderRows = function (start, end) {
        var buffer = this._terminal.buffer;
        for (var i = start; i <= end; i++) {
            var lineData = buffer.translateBufferLineToString(buffer.ydisp + i, true);
            this._rowElements[i].textContent = lineData;
            this._rowElements[i].setAttribute('aria-posinset', (buffer.ydisp + i + 1).toString());
            this._rowElements[i].setAttribute('aria-setsize', (buffer.lines.length).toString());
        }
    };
    AccessibilityManager.prototype._refreshRowsDimensions = function () {
        var buffer = this._terminal.buffer;
        var dimensions = this._terminal.renderer.dimensions;
        for (var i = 0; i < this._terminal.rows; i++) {
            this._rowElements[i].style.height = dimensions.actualCellHeight + "px";
        }
    };
    AccessibilityManager.prototype.announce = function (text) {
        this._clearLiveRegion();
        this._liveRegion.textContent = text;
    };
    return AccessibilityManager;
}());
exports.AccessibilityManager = AccessibilityManager;
var NavigationMode = (function () {
    function NavigationMode(_terminal, _rowContainer, _rowElements, _accessibilityManager) {
        var _this = this;
        this._terminal = _terminal;
        this._rowContainer = _rowContainer;
        this._rowElements = _rowElements;
        this._accessibilityManager = _accessibilityManager;
        this._isNavigationModeActive = false;
        this._disposables = [];
        this._activeItemId = ACTIVE_ITEM_ID_PREFIX + Math.floor((Math.random() * 100000));
        this._disposables.push(Dom_1.addDisposableListener(this._rowContainer, 'keyup', function (e) {
            if (_this.isActive) {
                return _this.onKeyUp(e);
            }
            return false;
        }));
        this._disposables.push(Dom_1.addDisposableListener(this._rowContainer, 'keydown', function (e) {
            if (_this.isActive) {
                return _this.onKeyDown(e);
            }
            return false;
        }));
    }
    NavigationMode.prototype.dispose = function () {
        this._disposables.forEach(function (d) { return d.dispose(); });
        this._disposables = null;
    };
    NavigationMode.prototype.enter = function () {
        this._isNavigationModeActive = true;
        this._accessibilityManager.announce('Entered line navigation mode');
        this._rowContainer.tabIndex = 0;
        this._rowContainer.setAttribute('role', 'menu');
        this._rowContainer.setAttribute('aria-activedescendant', this._activeItemId);
        this._rowContainer.focus();
        this._navigateToElement(this._terminal.buffer.ydisp + this._terminal.buffer.y);
    };
    NavigationMode.prototype.leave = function () {
        this._isNavigationModeActive = false;
        this._accessibilityManager.announce('Left line navigation mode');
        this._rowContainer.removeAttribute('tabindex');
        this._rowContainer.removeAttribute('aria-activedescendant');
        this._rowContainer.removeAttribute('role');
        if (this._focusedElement) {
            this._focusedElement.removeAttribute('id');
        }
        this._terminal.textarea.focus();
    };
    Object.defineProperty(NavigationMode.prototype, "isActive", {
        get: function () {
            return this._isNavigationModeActive;
        },
        enumerable: true,
        configurable: true
    });
    NavigationMode.prototype.onKeyDown = function (e) {
        var _this = this;
        return this._onKey(e, function (e) {
            if (_this._isNavigationModeActive) {
                return true;
            }
            return false;
        });
    };
    NavigationMode.prototype.onKeyUp = function (e) {
        var _this = this;
        return this._onKey(e, function (e) {
            if (_this._isNavigationModeActive) {
                switch (e.keyCode) {
                    case 27: return _this._onEscape(e);
                    case 33: return _this._onPageUp(e);
                    case 34: return _this._onPageDown(e);
                    case 35: return _this._onEnd(e);
                    case 36: return _this._onHome(e);
                    case 38: return _this._onArrowUp(e);
                    case 40: return _this._onArrowDown(e);
                }
            }
            return false;
        });
    };
    NavigationMode.prototype._onKey = function (e, handler) {
        if (handler && handler(e)) {
            e.preventDefault();
            e.stopPropagation();
            return true;
        }
        return false;
    };
    NavigationMode.prototype._onEscape = function (e) {
        this.leave();
        return true;
    };
    NavigationMode.prototype._onArrowUp = function (e) {
        return this._focusRow(this._absoluteFocusedRow - 1);
    };
    NavigationMode.prototype._onArrowDown = function (e) {
        return this._focusRow(this._absoluteFocusedRow + 1);
    };
    NavigationMode.prototype._onPageUp = function (e) {
        return this._focusRow(this._absoluteFocusedRow - this._terminal.rows);
    };
    NavigationMode.prototype._onPageDown = function (e) {
        return this._focusRow(this._absoluteFocusedRow + this._terminal.rows);
    };
    NavigationMode.prototype._onHome = function (e) {
        return this._focusRow(0);
    };
    NavigationMode.prototype._onEnd = function (e) {
        return this._focusRow(this._terminal.buffer.lines.length - 1);
    };
    NavigationMode.prototype._focusRow = function (row) {
        this._navigateToElement(row);
        this._rowContainer.focus();
        return true;
    };
    NavigationMode.prototype._navigateToElement = function (absoluteRow) {
        absoluteRow = this._terminal.scrollToRow(absoluteRow);
        if (this._focusedElement) {
            this._focusedElement.removeAttribute('id');
        }
        this._absoluteFocusedRow = absoluteRow;
        this._focusedElement = this._rowElements[absoluteRow - this._terminal.buffer.ydisp];
        this._focusedElement.id = this._activeItemId;
    };
    return NavigationMode;
}());

//# sourceMappingURL=AccessibilityManager.js.map
