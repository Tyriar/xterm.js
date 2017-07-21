"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Buffer_1 = require("./Buffer");
var CircularList_1 = require("./utils/CircularList");
describe('Buffer', function () {
    var terminal;
    var buffer;
    beforeEach(function () {
        terminal = {
            cols: 80,
            rows: 24,
            scrollback: 1000
        };
        buffer = new Buffer_1.Buffer(terminal);
    });
    describe('constructor', function () {
        it('should create a CircularList with max length equal to scrollback, for its lines', function () {
            chai_1.assert.instanceOf(buffer.lines, CircularList_1.CircularList);
            chai_1.assert.equal(buffer.lines.maxLength, terminal.scrollback);
        });
        it('should set the Buffer\'s scrollBottom value equal to the terminal\'s rows -1', function () {
            chai_1.assert.equal(buffer.scrollBottom, terminal.rows - 1);
        });
    });
});

//# sourceMappingURL=Buffer.test.js.map
