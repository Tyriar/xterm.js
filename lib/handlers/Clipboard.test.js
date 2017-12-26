"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Clipboard = require("./Clipboard");
describe('evaluatePastedTextProcessing', function () {
    it('should replace carriage return + line feed with line feed on windows', function () {
        var pastedText = 'foo\r\nbar\r\n';
        var processedText = Clipboard.prepareTextForTerminal(pastedText, false);
        var windowsProcessedText = Clipboard.prepareTextForTerminal(pastedText, true);
        chai_1.assert.equal(processedText, 'foo\r\nbar\r\n');
        chai_1.assert.equal(windowsProcessedText, 'foo\rbar\r');
    });
    it('should bracket pasted text in bracketedPasteMode', function () {
        var pastedText = 'foo bar';
        var unbracketedText = Clipboard.bracketTextForPaste(pastedText, false);
        var bracketedText = Clipboard.bracketTextForPaste(pastedText, true);
        chai_1.assert.equal(unbracketedText, 'foo bar');
        chai_1.assert.equal(bracketedText, '\x1b[200~foo bar\x1b[201~');
    });
});

//# sourceMappingURL=Clipboard.test.js.map
