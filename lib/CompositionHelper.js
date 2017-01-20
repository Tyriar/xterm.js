"use strict";
var CompositionHelper = (function () {
    function CompositionHelper(textarea, compositionView, terminal) {
        this.textarea = textarea;
        this.compositionView = compositionView;
        this.terminal = terminal;
        this.isComposing = false;
        this.isSendingComposition = false;
        this.compositionPosition = { start: null, end: null };
    }
    ;
    CompositionHelper.prototype.compositionstart = function () {
        this.isComposing = true;
        this.compositionPosition.start = this.textarea.value.length;
        this.compositionView.textContent = '';
        this.compositionView.classList.add('active');
    };
    CompositionHelper.prototype.compositionupdate = function (ev) {
        this.compositionView.textContent = ev.data;
        this.updateCompositionElements();
        var self = this;
        setTimeout(function () {
            self.compositionPosition.end = self.textarea.value.length;
        }, 0);
    };
    CompositionHelper.prototype.compositionend = function () {
        this.finalizeComposition(true);
    };
    CompositionHelper.prototype.keydown = function (ev) {
        if (this.isComposing || this.isSendingComposition) {
            if (ev.keyCode === 229) {
                return false;
            }
            else if (ev.keyCode === 16 || ev.keyCode === 17 || ev.keyCode === 18) {
                return false;
            }
            else {
                this.finalizeComposition(false);
            }
        }
        if (ev.keyCode === 229) {
            this.handleAnyTextareaChanges();
            return false;
        }
        return true;
    };
    CompositionHelper.prototype.finalizeComposition = function (waitForPropogation) {
        this.compositionView.classList.remove('active');
        this.isComposing = false;
        this.clearTextareaPosition();
        if (!waitForPropogation) {
            this.isSendingComposition = false;
            var input = this.textarea.value.substring(this.compositionPosition.start, this.compositionPosition.end);
            this.terminal.handler(input);
        }
        else {
            var currentCompositionPosition = {
                start: this.compositionPosition.start,
                end: this.compositionPosition.end,
            };
            var self = this;
            this.isSendingComposition = true;
            setTimeout(function () {
                if (self.isSendingComposition) {
                    self.isSendingComposition = false;
                    var input;
                    if (self.isComposing) {
                        input = self.textarea.value.substring(currentCompositionPosition.start, currentCompositionPosition.end);
                    }
                    else {
                        input = self.textarea.value.substring(currentCompositionPosition.start);
                    }
                    self.terminal.handler(input);
                }
            }, 0);
        }
    };
    CompositionHelper.prototype.handleAnyTextareaChanges = function () {
        var oldValue = this.textarea.value;
        var self = this;
        setTimeout(function () {
            if (!self.isComposing) {
                var newValue = self.textarea.value;
                var diff = newValue.replace(oldValue, '');
                if (diff.length > 0) {
                    self.terminal.handler(diff);
                }
            }
        }, 0);
    };
    CompositionHelper.prototype.updateCompositionElements = function (dontRecurse) {
        if (!this.isComposing) {
            return;
        }
        var cursor = this.terminal.element.querySelector('.terminal-cursor');
        if (cursor) {
            var xtermRows = this.terminal.element.querySelector('.xterm-rows');
            var cursorTop = xtermRows.offsetTop + cursor.offsetTop;
            this.compositionView.style.left = cursor.offsetLeft + 'px';
            this.compositionView.style.top = cursorTop + 'px';
            this.compositionView.style.height = cursor.offsetHeight + 'px';
            this.compositionView.style.lineHeight = cursor.offsetHeight + 'px';
            var compositionViewBounds = this.compositionView.getBoundingClientRect();
            this.textarea.style.left = cursor.offsetLeft + 'px';
            this.textarea.style.top = cursorTop + 'px';
            this.textarea.style.width = compositionViewBounds.width + 'px';
            this.textarea.style.height = compositionViewBounds.height + 'px';
            this.textarea.style.lineHeight = compositionViewBounds.height + 'px';
        }
        if (!dontRecurse) {
            setTimeout(this.updateCompositionElements.bind(this, true), 0);
        }
    };
    ;
    CompositionHelper.prototype.clearTextareaPosition = function () {
        this.textarea.style.left = '';
        this.textarea.style.top = '';
    };
    ;
    return CompositionHelper;
}());
exports.CompositionHelper = CompositionHelper;

//# sourceMappingURL=CompositionHelper.js.map
