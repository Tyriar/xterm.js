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
var BufferSet_1 = require("./BufferSet");
var CompositionHelper_1 = require("./CompositionHelper");
var EventEmitter_1 = require("./EventEmitter");
var Viewport_1 = require("./Viewport");
var Clipboard_1 = require("./handlers/Clipboard");
var EscapeSequences_1 = require("./EscapeSequences");
var InputHandler_1 = require("./InputHandler");
var Parser_1 = require("./Parser");
var Renderer_1 = require("./Renderer");
var Linkifier_1 = require("./Linkifier");
var SelectionManager_1 = require("./SelectionManager");
var CharMeasure_1 = require("./utils/CharMeasure");
var Browser = require("./utils/Browser");
var Mouse_1 = require("./utils/Mouse");
var Sounds_1 = require("./utils/Sounds");
var document = (typeof window !== 'undefined') ? window.document : null;
var WRITE_BUFFER_PAUSE_THRESHOLD = 5;
var WRITE_BATCH_SIZE = 300;
var CURSOR_BLINK_INTERVAL = 600;
var tangoColors = [
    '#2e3436',
    '#cc0000',
    '#4e9a06',
    '#c4a000',
    '#3465a4',
    '#75507b',
    '#06989a',
    '#d3d7cf',
    '#555753',
    '#ef2929',
    '#8ae234',
    '#fce94f',
    '#729fcf',
    '#ad7fa8',
    '#34e2e2',
    '#eeeeec'
];
var defaultColors = (function () {
    var colors = tangoColors.slice();
    var r = [0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff];
    var i;
    i = 0;
    for (; i < 216; i++) {
        out(r[(i / 36) % 6 | 0], r[(i / 6) % 6 | 0], r[i % 6]);
    }
    i = 0;
    var c;
    for (; i < 24; i++) {
        c = 8 + i * 10;
        out(c, c, c);
    }
    function out(r, g, b) {
        colors.push('#' + hex(r) + hex(g) + hex(b));
    }
    function hex(c) {
        var s = c.toString(16);
        return s.length < 2 ? '0' + s : s;
    }
    return colors;
})();
var _colors = defaultColors.slice();
var vcolors = (function () {
    var out = [];
    var color;
    for (var i = 0; i < 256; i++) {
        color = parseInt(defaultColors[i].substring(1), 16);
        out.push([
            (color >> 16) & 0xff,
            (color >> 8) & 0xff,
            color & 0xff
        ]);
    }
    return out;
})();
var DEFAULT_OPTIONS = {
    colors: defaultColors,
    convertEol: false,
    termName: 'xterm',
    geometry: [80, 24],
    cursorBlink: false,
    cursorStyle: 'block',
    bellSound: Sounds_1.BellSound,
    bellStyle: 'none',
    scrollback: 1000,
    screenKeys: false,
    debug: false,
    cancelEvents: false,
    disableStdin: false,
    useFlowControl: false,
    tabStopWidth: 8
};
var Terminal = (function (_super) {
    __extends(Terminal, _super);
    function Terminal(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.browser = Browser;
        _this.options = options;
        _this.setup();
        return _this;
    }
    Terminal.prototype.setup = function () {
        var _this = this;
        Object.keys(DEFAULT_OPTIONS).forEach(function (key) {
            if (_this.options[key] == null) {
                _this.options[key] = DEFAULT_OPTIONS[key];
            }
            _this[key] = _this.options[key];
        });
        if (this.options.colors.length === 8) {
            this.options.colors = this.options.colors.concat(_colors.slice(8));
        }
        else if (this.options.colors.length === 16) {
            this.options.colors = this.options.colors.concat(_colors.slice(16));
        }
        else if (this.options.colors.length === 10) {
            this.options.colors = this.options.colors.slice(0, -2).concat(_colors.slice(8, -2), this.options.colors.slice(-2));
        }
        else if (this.options.colors.length === 18) {
            this.options.colors = this.options.colors.concat(_colors.slice(16, -2), this.options.colors.slice(-2));
        }
        this.colors = this.options.colors;
        this.parent = document ? document.body : null;
        this.cols = this.options.cols || this.options.geometry[0];
        this.rows = this.options.rows || this.options.geometry[1];
        this.geometry = [this.cols, this.rows];
        if (this.options.handler) {
            this.on('data', this.options.handler);
        }
        this.cursorState = 0;
        this.cursorHidden = false;
        this.sendDataQueue = '';
        this.customKeyEventHandler = null;
        this.cursorBlinkInterval = null;
        this.applicationKeypad = false;
        this.applicationCursor = false;
        this.originMode = false;
        this.insertMode = false;
        this.wraparoundMode = true;
        this.charset = null;
        this.gcharset = null;
        this.glevel = 0;
        this.charsets = [null];
        this.readable = true;
        this.writable = true;
        this.defAttr = (0 << 18) | (257 << 9) | (256 << 0);
        this.curAttr = (0 << 18) | (257 << 9) | (256 << 0);
        this.params = [];
        this.currentParam = 0;
        this.prefix = '';
        this.postfix = '';
        this.writeBuffer = [];
        this.writeInProgress = false;
        this.xoffSentToCatchUp = false;
        this.writeStopped = false;
        this.surrogate_high = '';
        this.userScrolling = false;
        this.inputHandler = new InputHandler_1.InputHandler(this);
        this.parser = new Parser_1.Parser(this.inputHandler, this);
        this.renderer = this.renderer || null;
        this.selectionManager = this.selectionManager || null;
        this.linkifier = this.linkifier || new Linkifier_1.Linkifier();
        this.buffers = new BufferSet_1.BufferSet(this);
        this.buffer = this.buffers.active;
        this.buffers.on('activate', function (buffer) {
            _this.buffer = buffer;
        });
        if (this.selectionManager) {
            this.selectionManager.setBuffer(this.buffer);
        }
    };
    Terminal.prototype.eraseAttr = function () {
        return (this.defAttr & ~0x1ff) | (this.curAttr & 0x1ff);
    };
    Terminal.prototype.focus = function () {
        this.textarea.focus();
    };
    Terminal.prototype.getOption = function (key) {
        if (!(key in DEFAULT_OPTIONS)) {
            throw new Error('No option with key "' + key + '"');
        }
        if (typeof this.options[key] !== 'undefined') {
            return this.options[key];
        }
        return this[key];
    };
    Terminal.prototype.setOption = function (key, value) {
        if (!(key in DEFAULT_OPTIONS)) {
            throw new Error('No option with key "' + key + '"');
        }
        switch (key) {
            case 'bellStyle':
                if (!value) {
                    value = 'none';
                }
                break;
            case 'cursorStyle':
                if (!value) {
                    value = 'block';
                }
                break;
            case 'tabStopWidth':
                if (value < 1) {
                    console.warn("tabStopWidth cannot be less than 1, value: " + value);
                    return;
                }
                break;
            case 'scrollback':
                if (value < 0) {
                    console.warn("scrollback cannot be less than 0, value: " + value);
                    return;
                }
                if (this.options[key] !== value) {
                    var newBufferLength = this.rows + value;
                    if (this.buffer.lines.length > newBufferLength) {
                        var amountToTrim = this.buffer.lines.length - newBufferLength;
                        var needsRefresh = (this.buffer.ydisp - amountToTrim < 0);
                        this.buffer.lines.trimStart(amountToTrim);
                        this.buffer.ybase = Math.max(this.buffer.ybase - amountToTrim, 0);
                        this.buffer.ydisp = Math.max(this.buffer.ydisp - amountToTrim, 0);
                        if (needsRefresh) {
                            this.refresh(0, this.rows - 1);
                        }
                    }
                }
                break;
        }
        this[key] = value;
        this.options[key] = value;
        switch (key) {
            case 'cursorBlink':
                this.setCursorBlinking(value);
                break;
            case 'cursorStyle':
                this.element.classList.toggle("xterm-cursor-style-block", value === 'block');
                this.element.classList.toggle("xterm-cursor-style-underline", value === 'underline');
                this.element.classList.toggle("xterm-cursor-style-bar", value === 'bar');
                break;
            case 'scrollback':
                this.buffers.resize(this.cols, this.rows);
                this.viewport.syncScrollArea();
                break;
            case 'tabStopWidth':
                this.buffers.setupTabStops();
                break;
            case 'bellSound':
            case 'bellStyle':
                this.syncBellSound();
                break;
        }
    };
    Terminal.prototype.restartCursorBlinking = function () {
        this.setCursorBlinking(this.options.cursorBlink);
    };
    Terminal.prototype.setCursorBlinking = function (enabled) {
        var _this = this;
        this.element.classList.toggle('xterm-cursor-blink', enabled);
        this.clearCursorBlinkingInterval();
        if (enabled) {
            this.cursorBlinkInterval = setInterval(function () {
                _this.element.classList.toggle('xterm-cursor-blink-on');
            }, CURSOR_BLINK_INTERVAL);
        }
    };
    Terminal.prototype.clearCursorBlinkingInterval = function () {
        this.element.classList.remove('xterm-cursor-blink-on');
        if (this.cursorBlinkInterval) {
            clearInterval(this.cursorBlinkInterval);
            this.cursorBlinkInterval = null;
        }
    };
    Terminal.prototype.bindFocus = function () {
        var _this = this;
        globalOn(this.textarea, 'focus', function (ev) {
            if (_this.sendFocus) {
                _this.send(EscapeSequences_1.C0.ESC + '[I');
            }
            _this.element.classList.add('focus');
            _this.showCursor();
            _this.restartCursorBlinking.apply(_this);
            _this.emit('focus');
        });
    };
    ;
    Terminal.prototype.blur = function () {
        return this.textarea.blur();
    };
    Terminal.prototype.bindBlur = function () {
        var _this = this;
        on(this.textarea, 'blur', function (ev) {
            _this.refresh(_this.buffer.y, _this.buffer.y);
            if (_this.sendFocus) {
                _this.send(EscapeSequences_1.C0.ESC + '[O');
            }
            _this.element.classList.remove('focus');
            _this.clearCursorBlinkingInterval.apply(_this);
            _this.emit('blur');
        });
    };
    Terminal.prototype.initGlobal = function () {
        var _this = this;
        this.bindKeys();
        this.bindFocus();
        this.bindBlur();
        on(this.element, 'copy', function (event) {
            if (!_this.hasSelection()) {
                return;
            }
            Clipboard_1.copyHandler(event, _this, _this.selectionManager);
        });
        var pasteHandlerWrapper = function (event) { return Clipboard_1.pasteHandler(event, _this); };
        on(this.textarea, 'paste', pasteHandlerWrapper);
        on(this.element, 'paste', pasteHandlerWrapper);
        if (Browser.isFirefox) {
            on(this.element, 'mousedown', function (event) {
                if (event.button === 2) {
                    Clipboard_1.rightClickHandler(event, _this.textarea, _this.selectionManager);
                }
            });
        }
        else {
            on(this.element, 'contextmenu', function (event) {
                Clipboard_1.rightClickHandler(event, _this.textarea, _this.selectionManager);
            });
        }
        if (Browser.isLinux) {
            on(this.element, 'auxclick', function (event) {
                if (event.button === 1) {
                    Clipboard_1.moveTextAreaUnderMouseCursor(event, _this.textarea);
                }
            });
        }
    };
    Terminal.prototype.bindKeys = function () {
        var _this = this;
        var self = this;
        on(this.element, 'keydown', function (ev) {
            if (document.activeElement !== this) {
                return;
            }
            self._keyDown(ev);
        }, true);
        on(this.element, 'keypress', function (ev) {
            if (document.activeElement !== this) {
                return;
            }
            self._keyPress(ev);
        }, true);
        on(this.element, 'keyup', function (ev) {
            if (!wasMondifierKeyOnlyEvent(ev)) {
                _this.focus();
            }
        }, true);
        on(this.textarea, 'keydown', function (ev) {
            _this._keyDown(ev);
        }, true);
        on(this.textarea, 'keypress', function (ev) {
            _this._keyPress(ev);
            _this.textarea.value = '';
        }, true);
        on(this.textarea, 'compositionstart', function () { return _this.compositionHelper.compositionstart(); });
        on(this.textarea, 'compositionupdate', function (e) { return _this.compositionHelper.compositionupdate(e); });
        on(this.textarea, 'compositionend', function () { return _this.compositionHelper.compositionend(); });
        this.on('refresh', function () { return _this.compositionHelper.updateCompositionElements(); });
        this.on('refresh', function (data) { return _this.queueLinkification(data.start, data.end); });
    };
    Terminal.prototype.insertRow = function (row) {
        if (typeof row !== 'object') {
            row = document.createElement('div');
        }
        this.rowContainer.appendChild(row);
        this.children.push(row);
        return row;
    };
    ;
    Terminal.prototype.open = function (parent) {
        var _this = this;
        var i = 0;
        var div;
        this.parent = parent || this.parent;
        if (!this.parent) {
            throw new Error('Terminal requires a parent element.');
        }
        this.context = this.parent.ownerDocument.defaultView;
        this.document = this.parent.ownerDocument;
        this.body = this.document.body;
        this.element = this.document.createElement('div');
        this.element.classList.add('terminal');
        this.element.classList.add('xterm');
        this.element.classList.add("xterm-cursor-style-" + this.options.cursorStyle);
        this.setCursorBlinking(this.options.cursorBlink);
        this.element.setAttribute('tabindex', '0');
        this.viewportElement = document.createElement('div');
        this.viewportElement.classList.add('xterm-viewport');
        this.element.appendChild(this.viewportElement);
        this.viewportScrollArea = document.createElement('div');
        this.viewportScrollArea.classList.add('xterm-scroll-area');
        this.viewportElement.appendChild(this.viewportScrollArea);
        this.syncBellSound();
        this.selectionContainer = document.createElement('div');
        this.selectionContainer.classList.add('xterm-selection');
        this.element.appendChild(this.selectionContainer);
        this.rowContainer = document.createElement('div');
        this.rowContainer.classList.add('xterm-rows');
        this.element.appendChild(this.rowContainer);
        this.children = [];
        this.linkifier.attachToDom(document, this.children);
        this.helperContainer = document.createElement('div');
        this.helperContainer.classList.add('xterm-helpers');
        this.element.appendChild(this.helperContainer);
        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('xterm-helper-textarea');
        this.textarea.setAttribute('autocorrect', 'off');
        this.textarea.setAttribute('autocapitalize', 'off');
        this.textarea.setAttribute('spellcheck', 'false');
        this.textarea.tabIndex = 0;
        this.textarea.addEventListener('focus', function () { return _this.emit('focus'); });
        this.textarea.addEventListener('blur', function () { return _this.emit('blur'); });
        this.helperContainer.appendChild(this.textarea);
        this.compositionView = document.createElement('div');
        this.compositionView.classList.add('composition-view');
        this.compositionHelper = new CompositionHelper_1.CompositionHelper(this.textarea, this.compositionView, this);
        this.helperContainer.appendChild(this.compositionView);
        this.charSizeStyleElement = document.createElement('style');
        this.helperContainer.appendChild(this.charSizeStyleElement);
        for (; i < this.rows; i++) {
            this.insertRow();
        }
        this.parent.appendChild(this.element);
        this.charMeasure = new CharMeasure_1.CharMeasure(document, this.helperContainer);
        this.charMeasure.on('charsizechanged', function () {
            _this.updateCharSizeStyles();
        });
        this.charMeasure.measure();
        this.viewport = new Viewport_1.Viewport(this, this.viewportElement, this.viewportScrollArea, this.charMeasure);
        this.renderer = new Renderer_1.Renderer(this);
        this.selectionManager = new SelectionManager_1.SelectionManager(this, this.buffer, this.rowContainer, this.charMeasure);
        this.selectionManager.on('refresh', function (data) {
            _this.renderer.refreshSelection(data.start, data.end);
        });
        this.selectionManager.on('newselection', function (text) {
            _this.textarea.value = text;
            _this.textarea.focus();
            _this.textarea.select();
        });
        this.on('scroll', function () { return _this.selectionManager.refresh(); });
        this.viewportElement.addEventListener('scroll', function () { return _this.selectionManager.refresh(); });
        this.refresh(0, this.rows - 1);
        this.initGlobal();
        this.bindMouse();
    };
    Terminal.loadAddon = function (addon, callback) {
        if (typeof exports === 'object' && typeof module === 'object') {
            return require('./addons/' + addon + '/' + addon);
        }
        else if (typeof define === 'function') {
            return require(['./addons/' + addon + '/' + addon], callback);
        }
        else {
            console.error('Cannot load a module without a CommonJS or RequireJS environment.');
            return false;
        }
    };
    Terminal.prototype.updateCharSizeStyles = function () {
        this.charSizeStyleElement.textContent =
            ".xterm-wide-char{width:" + this.charMeasure.width * 2 + "px;}" +
                (".xterm-normal-char{width:" + this.charMeasure.width + "px;}") +
                (".xterm-rows > div{height:" + this.charMeasure.height + "px;}");
    };
    Terminal.prototype.bindMouse = function () {
        var _this = this;
        var el = this.element;
        var self = this;
        var pressed = 32;
        function sendButton(ev) {
            var button;
            var pos;
            button = getButton(ev);
            pos = Mouse_1.getRawByteCoords(ev, self.rowContainer, self.charMeasure, self.cols, self.rows);
            if (!pos)
                return;
            sendEvent(button, pos);
            switch (ev.overrideType || ev.type) {
                case 'mousedown':
                    pressed = button;
                    break;
                case 'mouseup':
                    pressed = 32;
                    break;
                case 'wheel':
                    break;
            }
        }
        function sendMove(ev) {
            var button = pressed;
            var pos = Mouse_1.getRawByteCoords(ev, self.rowContainer, self.charMeasure, self.cols, self.rows);
            if (!pos)
                return;
            button += 32;
            sendEvent(button, pos);
        }
        function encode(data, ch) {
            if (!self.utfMouse) {
                if (ch === 255) {
                    data.push(0);
                    return;
                }
                if (ch > 127)
                    ch = 127;
                data.push(ch);
            }
            else {
                if (ch === 2047) {
                    data.push(0);
                    return;
                }
                if (ch < 127) {
                    data.push(ch);
                }
                else {
                    if (ch > 2047)
                        ch = 2047;
                    data.push(0xC0 | (ch >> 6));
                    data.push(0x80 | (ch & 0x3F));
                }
            }
        }
        function sendEvent(button, pos) {
            if (self.vt300Mouse) {
                button &= 3;
                pos.x -= 32;
                pos.y -= 32;
                var data_1 = EscapeSequences_1.C0.ESC + '[24';
                if (button === 0)
                    data_1 += '1';
                else if (button === 1)
                    data_1 += '3';
                else if (button === 2)
                    data_1 += '5';
                else if (button === 3)
                    return;
                else
                    data_1 += '0';
                data_1 += '~[' + pos.x + ',' + pos.y + ']\r';
                self.send(data_1);
                return;
            }
            if (self.decLocator) {
                button &= 3;
                pos.x -= 32;
                pos.y -= 32;
                if (button === 0)
                    button = 2;
                else if (button === 1)
                    button = 4;
                else if (button === 2)
                    button = 6;
                else if (button === 3)
                    button = 3;
                self.send(EscapeSequences_1.C0.ESC + '['
                    + button
                    + ';'
                    + (button === 3 ? 4 : 0)
                    + ';'
                    + pos.y
                    + ';'
                    + pos.x
                    + ';'
                    + pos.page || 0
                    + '&w');
                return;
            }
            if (self.urxvtMouse) {
                pos.x -= 32;
                pos.y -= 32;
                pos.x++;
                pos.y++;
                self.send(EscapeSequences_1.C0.ESC + '[' + button + ';' + pos.x + ';' + pos.y + 'M');
                return;
            }
            if (self.sgrMouse) {
                pos.x -= 32;
                pos.y -= 32;
                self.send(EscapeSequences_1.C0.ESC + '[<'
                    + (((button & 3) === 3 ? button & ~3 : button) - 32)
                    + ';'
                    + pos.x
                    + ';'
                    + pos.y
                    + ((button & 3) === 3 ? 'm' : 'M'));
                return;
            }
            var data = [];
            encode(data, button);
            encode(data, pos.x);
            encode(data, pos.y);
            self.send(EscapeSequences_1.C0.ESC + '[M' + String.fromCharCode.apply(String, data));
        }
        function getButton(ev) {
            var button;
            var shift;
            var meta;
            var ctrl;
            var mod;
            switch (ev.overrideType || ev.type) {
                case 'mousedown':
                    button = ev.button != null
                        ? +ev.button
                        : ev.which != null
                            ? ev.which - 1
                            : null;
                    if (Browser.isMSIE) {
                        button = button === 1 ? 0 : button === 4 ? 1 : button;
                    }
                    break;
                case 'mouseup':
                    button = 3;
                    break;
                case 'DOMMouseScroll':
                    button = ev.detail < 0
                        ? 64
                        : 65;
                    break;
                case 'wheel':
                    button = ev.wheelDeltaY > 0
                        ? 64
                        : 65;
                    break;
            }
            shift = ev.shiftKey ? 4 : 0;
            meta = ev.metaKey ? 8 : 0;
            ctrl = ev.ctrlKey ? 16 : 0;
            mod = shift | meta | ctrl;
            if (self.vt200Mouse) {
                mod &= ctrl;
            }
            else if (!self.normalMouse) {
                mod = 0;
            }
            button = (32 + (mod << 2)) + button;
            return button;
        }
        on(el, 'mousedown', function (ev) {
            ev.preventDefault();
            _this.focus();
            if (!_this.mouseEvents)
                return;
            sendButton(ev);
            if (_this.vt200Mouse) {
                ev.overrideType = 'mouseup';
                sendButton(ev);
                return _this.cancel(ev);
            }
            if (_this.normalMouse)
                on(_this.document, 'mousemove', sendMove);
            if (!_this.x10Mouse) {
                var handler_1 = function (ev) {
                    sendButton(ev);
                    if (_this.normalMouse)
                        off(_this.document, 'mousemove', sendMove);
                    off(_this.document, 'mouseup', handler_1);
                    return _this.cancel(ev);
                };
                on(_this.document, 'mouseup', handler_1);
            }
            return _this.cancel(ev);
        });
        on(el, 'wheel', function (ev) {
            if (!_this.mouseEvents)
                return;
            if (_this.x10Mouse || _this.vt300Mouse || _this.decLocator)
                return;
            sendButton(ev);
            ev.preventDefault();
        });
        on(el, 'wheel', function (ev) {
            if (_this.mouseEvents)
                return;
            _this.viewport.onWheel(ev);
            return _this.cancel(ev);
        });
        on(el, 'touchstart', function (ev) {
            if (_this.mouseEvents)
                return;
            _this.viewport.onTouchStart(ev);
            return _this.cancel(ev);
        });
        on(el, 'touchmove', function (ev) {
            if (_this.mouseEvents)
                return;
            _this.viewport.onTouchMove(ev);
            return _this.cancel(ev);
        });
    };
    Terminal.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.readable = false;
        this.writable = false;
        this.handler = function () { };
        this.write = function () { };
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    };
    Terminal.prototype.refresh = function (start, end) {
        if (this.renderer) {
            this.renderer.queueRefresh(start, end);
        }
    };
    Terminal.prototype.queueLinkification = function (start, end) {
        if (this.linkifier) {
            for (var i = start; i <= end; i++) {
                this.linkifier.linkifyRow(i);
            }
        }
    };
    Terminal.prototype.showCursor = function () {
        if (!this.cursorState) {
            this.cursorState = 1;
            this.refresh(this.buffer.y, this.buffer.y);
        }
    };
    Terminal.prototype.scroll = function (isWrapped) {
        var newLine = this.blankLine(undefined, isWrapped);
        var topRow = this.buffer.ybase + this.buffer.scrollTop;
        var bottomRow = this.buffer.ybase + this.buffer.scrollBottom;
        if (this.buffer.scrollTop === 0) {
            var willBufferBeTrimmed = this.buffer.lines.length === this.buffer.lines.maxLength;
            if (bottomRow === this.buffer.lines.length - 1) {
                this.buffer.lines.push(newLine);
            }
            else {
                this.buffer.lines.splice(bottomRow + 1, 0, newLine);
            }
            if (!willBufferBeTrimmed) {
                this.buffer.ybase++;
                this.buffer.ydisp++;
            }
        }
        else {
            var scrollRegionHeight = bottomRow - topRow + 1;
            this.buffer.lines.shiftElements(topRow + 1, scrollRegionHeight - 1, -1);
            this.buffer.lines.set(bottomRow, newLine);
        }
        if (!this.userScrolling) {
            this.buffer.ydisp = this.buffer.ybase;
        }
        this.updateRange(this.buffer.scrollTop);
        this.updateRange(this.buffer.scrollBottom);
        this.emit('scroll', this.buffer.ydisp);
    };
    Terminal.prototype.scrollDisp = function (disp, suppressScrollEvent) {
        if (disp < 0) {
            if (this.buffer.ydisp === 0) {
                return;
            }
            this.userScrolling = true;
        }
        else if (disp + this.buffer.ydisp >= this.buffer.ybase) {
            this.userScrolling = false;
        }
        var oldYdisp = this.buffer.ydisp;
        this.buffer.ydisp = Math.max(Math.min(this.buffer.ydisp + disp, this.buffer.ybase), 0);
        if (oldYdisp === this.buffer.ydisp) {
            return;
        }
        if (!suppressScrollEvent) {
            this.emit('scroll', this.buffer.ydisp);
        }
        this.refresh(0, this.rows - 1);
    };
    Terminal.prototype.scrollPages = function (pageCount) {
        this.scrollDisp(pageCount * (this.rows - 1));
    };
    Terminal.prototype.scrollToTop = function () {
        this.scrollDisp(-this.buffer.ydisp);
    };
    Terminal.prototype.scrollToBottom = function () {
        this.scrollDisp(this.buffer.ybase - this.buffer.ydisp);
    };
    Terminal.prototype.write = function (data) {
        var _this = this;
        this.writeBuffer.push(data);
        if (this.options.useFlowControl && !this.xoffSentToCatchUp && this.writeBuffer.length >= WRITE_BUFFER_PAUSE_THRESHOLD) {
            this.send(EscapeSequences_1.C0.DC3);
            this.xoffSentToCatchUp = true;
        }
        if (!this.writeInProgress && this.writeBuffer.length > 0) {
            this.writeInProgress = true;
            setTimeout(function () {
                _this.innerWrite();
            });
        }
    };
    Terminal.prototype.innerWrite = function () {
        var _this = this;
        var writeBatch = this.writeBuffer.splice(0, WRITE_BATCH_SIZE);
        while (writeBatch.length > 0) {
            var data = writeBatch.shift();
            if (this.xoffSentToCatchUp && writeBatch.length === 0 && this.writeBuffer.length === 0) {
                this.send(EscapeSequences_1.C0.DC1);
                this.xoffSentToCatchUp = false;
            }
            this.refreshStart = this.buffer.y;
            this.refreshEnd = this.buffer.y;
            var state = this.parser.parse(data);
            this.parser.setState(state);
            this.updateRange(this.buffer.y);
            this.refresh(this.refreshStart, this.refreshEnd);
        }
        if (this.writeBuffer.length > 0) {
            setTimeout(function () { return _this.innerWrite(); }, 0);
        }
        else {
            this.writeInProgress = false;
        }
    };
    Terminal.prototype.writeln = function (data) {
        this.write(data + '\r\n');
    };
    Terminal.prototype.attachCustomKeyEventHandler = function (customKeyEventHandler) {
        this.customKeyEventHandler = customKeyEventHandler;
    };
    Terminal.prototype.setHypertextLinkHandler = function (handler) {
        if (!this.linkifier) {
            throw new Error('Cannot attach a hypertext link handler before Terminal.open is called');
        }
        this.linkifier.setHypertextLinkHandler(handler);
        this.refresh(0, this.rows - 1);
    };
    Terminal.prototype.setHypertextValidationCallback = function (callback) {
        if (!this.linkifier) {
            throw new Error('Cannot attach a hypertext validation callback before Terminal.open is called');
        }
        this.linkifier.setHypertextValidationCallback(callback);
        this.refresh(0, this.rows - 1);
    };
    Terminal.prototype.registerLinkMatcher = function (regex, handler, options) {
        if (this.linkifier) {
            var matcherId = this.linkifier.registerLinkMatcher(regex, handler, options);
            this.refresh(0, this.rows - 1);
            return matcherId;
        }
    };
    Terminal.prototype.deregisterLinkMatcher = function (matcherId) {
        if (this.linkifier) {
            if (this.linkifier.deregisterLinkMatcher(matcherId)) {
                this.refresh(0, this.rows - 1);
            }
        }
    };
    Terminal.prototype.hasSelection = function () {
        return this.selectionManager ? this.selectionManager.hasSelection : false;
    };
    Terminal.prototype.getSelection = function () {
        return this.selectionManager ? this.selectionManager.selectionText : '';
    };
    Terminal.prototype.clearSelection = function () {
        if (this.selectionManager) {
            this.selectionManager.clearSelection();
        }
    };
    Terminal.prototype.selectAll = function () {
        if (this.selectionManager) {
            this.selectionManager.selectAll();
        }
    };
    Terminal.prototype._keyDown = function (ev) {
        if (this.customKeyEventHandler && this.customKeyEventHandler(ev) === false) {
            return false;
        }
        this.restartCursorBlinking();
        if (!this.compositionHelper.keydown(ev)) {
            if (this.buffer.ybase !== this.buffer.ydisp) {
                this.scrollToBottom();
            }
            return false;
        }
        var result = this._evaluateKeyEscapeSequence(ev);
        if (result.key === EscapeSequences_1.C0.DC3) {
            this.writeStopped = true;
        }
        else if (result.key === EscapeSequences_1.C0.DC1) {
            this.writeStopped = false;
        }
        if (result.scrollDisp) {
            this.scrollDisp(result.scrollDisp);
            return this.cancel(ev, true);
        }
        if (isThirdLevelShift(this.browser, ev)) {
            return true;
        }
        if (result.cancel) {
            this.cancel(ev, true);
        }
        if (!result.key) {
            return true;
        }
        this.emit('keydown', ev);
        this.emit('key', result.key, ev);
        this.showCursor();
        this.handler(result.key);
        return this.cancel(ev, true);
    };
    Terminal.prototype._evaluateKeyEscapeSequence = function (ev) {
        var result = {
            cancel: false,
            key: undefined,
            scrollDisp: undefined
        };
        var modifiers = (ev.shiftKey ? 1 : 0) | (ev.altKey ? 2 : 0) | (ev.ctrlKey ? 4 : 0) | (ev.metaKey ? 8 : 0);
        switch (ev.keyCode) {
            case 8:
                if (ev.shiftKey) {
                    result.key = EscapeSequences_1.C0.BS;
                    break;
                }
                result.key = EscapeSequences_1.C0.DEL;
                break;
            case 9:
                if (ev.shiftKey) {
                    result.key = EscapeSequences_1.C0.ESC + '[Z';
                    break;
                }
                result.key = EscapeSequences_1.C0.HT;
                result.cancel = true;
                break;
            case 13:
                result.key = EscapeSequences_1.C0.CR;
                result.cancel = true;
                break;
            case 27:
                result.key = EscapeSequences_1.C0.ESC;
                result.cancel = true;
                break;
            case 37:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'D';
                    if (result.key === EscapeSequences_1.C0.ESC + '[1;3D') {
                        result.key = (this.browser.isMac) ? EscapeSequences_1.C0.ESC + 'b' : EscapeSequences_1.C0.ESC + '[1;5D';
                    }
                }
                else if (this.applicationCursor) {
                    result.key = EscapeSequences_1.C0.ESC + 'OD';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[D';
                }
                break;
            case 39:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'C';
                    if (result.key === EscapeSequences_1.C0.ESC + '[1;3C') {
                        result.key = (this.browser.isMac) ? EscapeSequences_1.C0.ESC + 'f' : EscapeSequences_1.C0.ESC + '[1;5C';
                    }
                }
                else if (this.applicationCursor) {
                    result.key = EscapeSequences_1.C0.ESC + 'OC';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[C';
                }
                break;
            case 38:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'A';
                    if (result.key === EscapeSequences_1.C0.ESC + '[1;3A') {
                        result.key = EscapeSequences_1.C0.ESC + '[1;5A';
                    }
                }
                else if (this.applicationCursor) {
                    result.key = EscapeSequences_1.C0.ESC + 'OA';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[A';
                }
                break;
            case 40:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'B';
                    if (result.key === EscapeSequences_1.C0.ESC + '[1;3B') {
                        result.key = EscapeSequences_1.C0.ESC + '[1;5B';
                    }
                }
                else if (this.applicationCursor) {
                    result.key = EscapeSequences_1.C0.ESC + 'OB';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[B';
                }
                break;
            case 45:
                if (!ev.shiftKey && !ev.ctrlKey) {
                    result.key = EscapeSequences_1.C0.ESC + '[2~';
                }
                break;
            case 46:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[3;' + (modifiers + 1) + '~';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[3~';
                }
                break;
            case 36:
                if (modifiers)
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'H';
                else if (this.applicationCursor)
                    result.key = EscapeSequences_1.C0.ESC + 'OH';
                else
                    result.key = EscapeSequences_1.C0.ESC + '[H';
                break;
            case 35:
                if (modifiers)
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'F';
                else if (this.applicationCursor)
                    result.key = EscapeSequences_1.C0.ESC + 'OF';
                else
                    result.key = EscapeSequences_1.C0.ESC + '[F';
                break;
            case 33:
                if (ev.shiftKey) {
                    result.scrollDisp = -(this.rows - 1);
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[5~';
                }
                break;
            case 34:
                if (ev.shiftKey) {
                    result.scrollDisp = this.rows - 1;
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[6~';
                }
                break;
            case 112:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'P';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + 'OP';
                }
                break;
            case 113:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'Q';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + 'OQ';
                }
                break;
            case 114:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'R';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + 'OR';
                }
                break;
            case 115:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[1;' + (modifiers + 1) + 'S';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + 'OS';
                }
                break;
            case 116:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[15;' + (modifiers + 1) + '~';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[15~';
                }
                break;
            case 117:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[17;' + (modifiers + 1) + '~';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[17~';
                }
                break;
            case 118:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[18;' + (modifiers + 1) + '~';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[18~';
                }
                break;
            case 119:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[19;' + (modifiers + 1) + '~';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[19~';
                }
                break;
            case 120:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[20;' + (modifiers + 1) + '~';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[20~';
                }
                break;
            case 121:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[21;' + (modifiers + 1) + '~';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[21~';
                }
                break;
            case 122:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[23;' + (modifiers + 1) + '~';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[23~';
                }
                break;
            case 123:
                if (modifiers) {
                    result.key = EscapeSequences_1.C0.ESC + '[24;' + (modifiers + 1) + '~';
                }
                else {
                    result.key = EscapeSequences_1.C0.ESC + '[24~';
                }
                break;
            default:
                if (ev.ctrlKey && !ev.shiftKey && !ev.altKey && !ev.metaKey) {
                    if (ev.keyCode >= 65 && ev.keyCode <= 90) {
                        result.key = String.fromCharCode(ev.keyCode - 64);
                    }
                    else if (ev.keyCode === 32) {
                        result.key = String.fromCharCode(0);
                    }
                    else if (ev.keyCode >= 51 && ev.keyCode <= 55) {
                        result.key = String.fromCharCode(ev.keyCode - 51 + 27);
                    }
                    else if (ev.keyCode === 56) {
                        result.key = String.fromCharCode(127);
                    }
                    else if (ev.keyCode === 219) {
                        result.key = String.fromCharCode(27);
                    }
                    else if (ev.keyCode === 220) {
                        result.key = String.fromCharCode(28);
                    }
                    else if (ev.keyCode === 221) {
                        result.key = String.fromCharCode(29);
                    }
                }
                else if (!this.browser.isMac && ev.altKey && !ev.ctrlKey && !ev.metaKey) {
                    if (ev.keyCode >= 65 && ev.keyCode <= 90) {
                        result.key = EscapeSequences_1.C0.ESC + String.fromCharCode(ev.keyCode + 32);
                    }
                    else if (ev.keyCode === 192) {
                        result.key = EscapeSequences_1.C0.ESC + '`';
                    }
                    else if (ev.keyCode >= 48 && ev.keyCode <= 57) {
                        result.key = EscapeSequences_1.C0.ESC + (ev.keyCode - 48);
                    }
                }
                else if (this.browser.isMac && !ev.altKey && !ev.ctrlKey && ev.metaKey) {
                    if (ev.keyCode === 65) {
                        this.selectAll();
                    }
                }
                break;
        }
        return result;
    };
    Terminal.prototype.setgLevel = function (g) {
        this.glevel = g;
        this.charset = this.charsets[g];
    };
    Terminal.prototype.setgCharset = function (g, charset) {
        this.charsets[g] = charset;
        if (this.glevel === g) {
            this.charset = charset;
        }
    };
    Terminal.prototype._keyPress = function (ev) {
        var key;
        if (this.customKeyEventHandler && this.customKeyEventHandler(ev) === false) {
            return false;
        }
        this.cancel(ev);
        if (ev.charCode) {
            key = ev.charCode;
        }
        else if (ev.which == null) {
            key = ev.keyCode;
        }
        else if (ev.which !== 0 && ev.charCode !== 0) {
            key = ev.which;
        }
        else {
            return false;
        }
        if (!key || ((ev.altKey || ev.ctrlKey || ev.metaKey) && !isThirdLevelShift(this.browser, ev))) {
            return false;
        }
        key = String.fromCharCode(key);
        this.emit('keypress', key, ev);
        this.emit('key', key, ev);
        this.showCursor();
        this.handler(key);
        return true;
    };
    Terminal.prototype.send = function (data) {
        var _this = this;
        if (!this.sendDataQueue) {
            setTimeout(function () {
                _this.handler(_this.sendDataQueue);
                _this.sendDataQueue = '';
            }, 1);
        }
        this.sendDataQueue += data;
    };
    Terminal.prototype.bell = function () {
        var _this = this;
        this.emit('bell');
        if (this.soundBell())
            this.bellAudioElement.play();
        if (this.visualBell()) {
            this.element.classList.add('visual-bell-active');
            clearTimeout(this.visualBellTimer);
            this.visualBellTimer = window.setTimeout(function () {
                _this.element.classList.remove('visual-bell-active');
            }, 200);
        }
    };
    Terminal.prototype.log = function (text, data) {
        if (!this.options.debug)
            return;
        if (!this.context.console || !this.context.console.log)
            return;
        this.context.console.log(text, data);
    };
    Terminal.prototype.error = function (text, data) {
        if (!this.options.debug)
            return;
        if (!this.context.console || !this.context.console.error)
            return;
        this.context.console.error(text, data);
    };
    Terminal.prototype.resize = function (x, y) {
        if (isNaN(x) || isNaN(y)) {
            return;
        }
        var line;
        var el;
        var i;
        var j;
        var ch;
        var addToY;
        if (x === this.cols && y === this.rows) {
            if (!this.charMeasure.width || !this.charMeasure.height) {
                this.charMeasure.measure();
            }
            return;
        }
        if (x < 1)
            x = 1;
        if (y < 1)
            y = 1;
        this.buffers.resize(x, y);
        while (this.children.length < y) {
            this.insertRow();
        }
        while (this.children.length > y) {
            el = this.children.shift();
            if (!el)
                continue;
            el.parentNode.removeChild(el);
        }
        this.cols = x;
        this.rows = y;
        this.buffers.setupTabStops(this.cols);
        this.charMeasure.measure();
        this.refresh(0, this.rows - 1);
        this.geometry = [this.cols, this.rows];
        this.emit('resize', { cols: x, rows: y });
    };
    Terminal.prototype.updateRange = function (y) {
        if (y < this.refreshStart)
            this.refreshStart = y;
        if (y > this.refreshEnd)
            this.refreshEnd = y;
    };
    Terminal.prototype.maxRange = function () {
        this.refreshStart = 0;
        this.refreshEnd = this.rows - 1;
    };
    Terminal.prototype.eraseRight = function (x, y) {
        var line = this.buffer.lines.get(this.buffer.ybase + y);
        if (!line) {
            return;
        }
        var ch = [this.eraseAttr(), ' ', 1];
        for (; x < this.cols; x++) {
            line[x] = ch;
        }
        this.updateRange(y);
    };
    Terminal.prototype.eraseLeft = function (x, y) {
        var line = this.buffer.lines.get(this.buffer.ybase + y);
        if (!line) {
            return;
        }
        var ch = [this.eraseAttr(), ' ', 1];
        x++;
        while (x--) {
            line[x] = ch;
        }
        this.updateRange(y);
    };
    Terminal.prototype.clear = function () {
        if (this.buffer.ybase === 0 && this.buffer.y === 0) {
            return;
        }
        this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y));
        this.buffer.lines.length = 1;
        this.buffer.ydisp = 0;
        this.buffer.ybase = 0;
        this.buffer.y = 0;
        for (var i = 1; i < this.rows; i++) {
            this.buffer.lines.push(this.blankLine());
        }
        this.refresh(0, this.rows - 1);
        this.emit('scroll', this.buffer.ydisp);
    };
    Terminal.prototype.eraseLine = function (y) {
        this.eraseRight(0, y);
    };
    Terminal.prototype.blankLine = function (cur, isWrapped, cols) {
        var attr = cur ? this.eraseAttr() : this.defAttr;
        var ch = [attr, ' ', 1];
        var line = [];
        if (isWrapped) {
            line.isWrapped = isWrapped;
        }
        cols = cols || this.cols;
        for (var i = 0; i < cols; i++) {
            line[i] = ch;
        }
        return line;
    };
    Terminal.prototype.ch = function (cur) {
        return cur ? [this.eraseAttr(), ' ', 1] : [this.defAttr, ' ', 1];
    };
    Terminal.prototype.is = function (term) {
        return (this.options.termName + '').indexOf(term) === 0;
    };
    Terminal.prototype.handler = function (data) {
        if (this.options.disableStdin) {
            return;
        }
        if (this.selectionManager && this.selectionManager.hasSelection) {
            this.selectionManager.clearSelection();
        }
        if (this.buffer.ybase !== this.buffer.ydisp) {
            this.scrollToBottom();
        }
        this.emit('data', data);
    };
    Terminal.prototype.handleTitle = function (title) {
        this.emit('title', title);
    };
    Terminal.prototype.index = function () {
        this.buffer.y++;
        if (this.buffer.y > this.buffer.scrollBottom) {
            this.buffer.y--;
            this.scroll();
        }
        if (this.buffer.x >= this.cols) {
            this.buffer.x--;
        }
    };
    Terminal.prototype.reverseIndex = function () {
        if (this.buffer.y === this.buffer.scrollTop) {
            var scrollRegionHeight = this.buffer.scrollBottom - this.buffer.scrollTop;
            this.buffer.lines.shiftElements(this.buffer.y + this.buffer.ybase, scrollRegionHeight, 1);
            this.buffer.lines.set(this.buffer.y + this.buffer.ybase, this.blankLine(true));
            this.updateRange(this.buffer.scrollTop);
            this.updateRange(this.buffer.scrollBottom);
        }
        else {
            this.buffer.y--;
        }
    };
    Terminal.prototype.reset = function () {
        this.options.rows = this.rows;
        this.options.cols = this.cols;
        var customKeyEventHandler = this.customKeyEventHandler;
        var cursorBlinkInterval = this.cursorBlinkInterval;
        var inputHandler = this.inputHandler;
        var buffers = this.buffers;
        this.setup();
        this.customKeyEventHandler = customKeyEventHandler;
        this.cursorBlinkInterval = cursorBlinkInterval;
        this.inputHandler = inputHandler;
        this.buffers = buffers;
        this.refresh(0, this.rows - 1);
        this.viewport.syncScrollArea();
    };
    Terminal.prototype.tabSet = function () {
        this.buffer.tabs[this.buffer.x] = true;
    };
    Terminal.prototype.cancel = function (ev, force) {
        if (!this.options.cancelEvents && !force) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        return false;
    };
    Terminal.prototype.matchColor = function (r1, g1, b1) {
        var hash = (r1 << 16) | (g1 << 8) | b1;
        if (matchColorCache[hash] != null) {
            return matchColorCache[hash];
        }
        var ldiff = Infinity;
        var li = -1;
        var i = 0;
        var c;
        var r2;
        var g2;
        var b2;
        var diff;
        for (; i < vcolors.length; i++) {
            c = vcolors[i];
            r2 = c[0];
            g2 = c[1];
            b2 = c[2];
            diff = matchColorDistance(r1, g1, b1, r2, g2, b2);
            if (diff === 0) {
                li = i;
                break;
            }
            if (diff < ldiff) {
                ldiff = diff;
                li = i;
            }
        }
        return matchColorCache[hash] = li;
    };
    Terminal.prototype.visualBell = function () {
        return this.options.bellStyle === 'visual' ||
            this.options.bellStyle === 'both';
    };
    Terminal.prototype.soundBell = function () {
        return this.options.bellStyle === 'sound' ||
            this.options.bellStyle === 'both';
    };
    Terminal.prototype.syncBellSound = function () {
        if (this.soundBell() && this.bellAudioElement) {
            this.bellAudioElement.setAttribute('src', this.options.bellSound);
        }
        else if (this.soundBell()) {
            this.bellAudioElement = document.createElement('audio');
            this.bellAudioElement.setAttribute('preload', 'auto');
            this.bellAudioElement.setAttribute('src', this.options.bellSound);
            this.helperContainer.appendChild(this.bellAudioElement);
        }
        else if (this.bellAudioElement) {
            this.helperContainer.removeChild(this.bellAudioElement);
        }
    };
    return Terminal;
}(EventEmitter_1.EventEmitter));
exports.Terminal = Terminal;
function globalOn(el, type, handler, capture) {
    if (!Array.isArray(el)) {
        el = [el];
    }
    el.forEach(function (element) {
        element.addEventListener(type, handler, capture || false);
    });
}
var on = globalOn;
function off(el, type, handler, capture) {
    if (capture === void 0) { capture = false; }
    el.removeEventListener(type, handler, capture);
}
function isThirdLevelShift(browser, ev) {
    var thirdLevelKey = (browser.isMac && ev.altKey && !ev.ctrlKey && !ev.metaKey) ||
        (browser.isMSWindows && ev.altKey && ev.ctrlKey && !ev.metaKey);
    if (ev.type === 'keypress') {
        return thirdLevelKey;
    }
    return thirdLevelKey && (!ev.keyCode || ev.keyCode > 47);
}
var matchColorCache = {};
var matchColorDistance = function (r1, g1, b1, r2, g2, b2) {
    return Math.pow(30 * (r1 - r2), 2)
        + Math.pow(59 * (g1 - g2), 2)
        + Math.pow(11 * (b1 - b2), 2);
};
function wasMondifierKeyOnlyEvent(ev) {
    return ev.keyCode === 16 ||
        ev.keyCode === 17 ||
        ev.keyCode === 18;
}

//# sourceMappingURL=Terminal.js.map
