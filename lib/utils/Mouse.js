"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCoordsRelativeToElement(event, element) {
    if (event.pageX == null) {
        return null;
    }
    var x = event.pageX;
    var y = event.pageY;
    while (element) {
        x -= element.offsetLeft;
        y -= element.offsetTop;
        element = 'offsetParent' in element ? element.offsetParent : element.parentElement;
    }
    return [x, y];
}
exports.getCoordsRelativeToElement = getCoordsRelativeToElement;
function getCoords(event, element, charMeasure, lineHeight, colCount, rowCount, isSelection) {
    if (!charMeasure.width || !charMeasure.height) {
        return null;
    }
    var coords = getCoordsRelativeToElement(event, element);
    if (!coords) {
        return null;
    }
    var flooredCharWidth = Math.floor(charMeasure.width);
    coords[0] = Math.ceil((coords[0] + (isSelection ? flooredCharWidth / 2 : 0)) / flooredCharWidth);
    coords[1] = Math.ceil(coords[1] / Math.ceil(charMeasure.height * lineHeight));
    coords[0] = Math.min(Math.max(coords[0], 1), colCount);
    coords[1] = Math.min(Math.max(coords[1], 1), rowCount);
    return coords;
}
exports.getCoords = getCoords;
function getRawByteCoords(event, element, charMeasure, lineHeight, colCount, rowCount) {
    var coords = getCoords(event, element, charMeasure, lineHeight, colCount, rowCount);
    var x = coords[0];
    var y = coords[1];
    x += 32;
    y += 32;
    return { x: x, y: y };
}
exports.getRawByteCoords = getRawByteCoords;

//# sourceMappingURL=Mouse.js.map
