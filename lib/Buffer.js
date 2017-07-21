"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CircularList_1 = require("./utils/CircularList");
var Buffer = (function () {
    function Buffer(terminal, ydisp, ybase, y, x, scrollBottom, scrollTop, tabs) {
        if (ydisp === void 0) { ydisp = 0; }
        if (ybase === void 0) { ybase = 0; }
        if (y === void 0) { y = 0; }
        if (x === void 0) { x = 0; }
        if (scrollBottom === void 0) { scrollBottom = 0; }
        if (scrollTop === void 0) { scrollTop = 0; }
        if (tabs === void 0) { tabs = {}; }
        this.terminal = terminal;
        this.ydisp = ydisp;
        this.ybase = ybase;
        this.y = y;
        this.x = x;
        this.scrollBottom = scrollBottom;
        this.scrollTop = scrollTop;
        this.tabs = tabs;
        this.lines = new CircularList_1.CircularList(this.terminal.scrollback);
        this.scrollBottom = this.terminal.rows - 1;
    }
    return Buffer;
}());
exports.Buffer = Buffer;

//# sourceMappingURL=Buffer.js.map
