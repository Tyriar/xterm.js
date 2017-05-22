"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCoords(event, rowContainer, charMeasure) {
    if (event.pageX == null) {
        return null;
    }
    var x = event.pageX;
    var y = event.pageY;
    var el = rowContainer;
    while (el && el !== self.document.documentElement) {
        x -= el.offsetLeft;
        y -= el.offsetTop;
        el = 'offsetParent' in el ? el.offsetParent : el.parentElement;
    }
    x = Math.ceil(x / charMeasure.width);
    y = Math.ceil(y / charMeasure.height);
    return [x, y];
}
exports.getCoords = getCoords;
function getRawByteCoords(event, rowContainer, charMeasure, colCount, rowCount) {
    var coords = getCoords(event, rowContainer, charMeasure);
    var x = coords[0];
    var y = coords[1];
    x = Math.min(Math.max(x, 0), colCount);
    y = Math.min(Math.max(y, 0), rowCount);
    x += 32;
    y += 32;
    return { x: x, y: y };
}
exports.getRawByteCoords = getRawByteCoords;

//# sourceMappingURL=Mouse.js.map
