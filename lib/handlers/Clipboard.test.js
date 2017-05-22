"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Clipboard = require("./Clipboard");
describe('evaluateCopiedTextProcessing', function () {
    it('should strip trailing whitespaces and replace nbsps with spaces', function () {
        var nonBreakingSpace = String.fromCharCode(160), copiedText = 'echo' + nonBreakingSpace + 'hello' + nonBreakingSpace, processedText = Clipboard.prepareTextForClipboard(copiedText);
        chai_1.assert.equal(processedText.match(/\s+$/), null);
        chai_1.assert.equal(processedText.indexOf(nonBreakingSpace), -1);
    });
});
describe('evaluatePastedTextProcessing', function () {
    it('should replace carriage return + line feed with line feed on windows', function () {
        var pastedText = 'foo\r\nbar\r\n', processedText = Clipboard.prepareTextForTerminal(pastedText, false), windowsProcessedText = Clipboard.prepareTextForTerminal(pastedText, true);
        chai_1.assert.equal(processedText, 'foo\r\nbar\r\n');
        chai_1.assert.equal(windowsProcessedText, 'foo\nbar\n');
    });
});

//# sourceMappingURL=Clipboard.test.js.map
