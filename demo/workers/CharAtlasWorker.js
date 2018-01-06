var _this = this;
var CHAR_ATLAS_CELL_SPACING = 1;
this.addEventListener('message', function (e) {
    var c = e.data;
    var cellWidth = c.scaledCharWidth + CHAR_ATLAS_CELL_SPACING;
    var cellHeight = c.scaledCharHeight + CHAR_ATLAS_CELL_SPACING;
    var canvas = new OffscreenCanvas(255 * cellWidth, (2 + 16) * cellHeight);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.fillStyle = c.foreground;
    ctx.font = c.fontSize * c.devicePixelRatio + "px " + c.fontFamily;
    ctx.textBaseline = 'top';
    for (var i = 0; i < 256; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(i * cellWidth, 0, cellWidth, cellHeight);
        ctx.clip();
        ctx.fillText(String.fromCharCode(i), i * cellWidth, 0);
        ctx.restore();
    }
    ctx.save();
    ctx.font = "bold " + ctx.font;
    for (var i = 0; i < 256; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(i * cellWidth, cellHeight, cellWidth, cellHeight);
        ctx.clip();
        ctx.fillText(String.fromCharCode(i), i * cellWidth, cellHeight);
        ctx.restore();
    }
    ctx.restore();
    ctx.font = c.fontSize * c.devicePixelRatio + "px " + c.fontFamily;
    for (var colorIndex = 0; colorIndex < 16; colorIndex++) {
        if (colorIndex === 8) {
            ctx.font = "bold " + ctx.font;
        }
        var y = (colorIndex + 2) * cellHeight;
        for (var i = 0; i < 256; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(i * cellWidth, y, cellWidth, cellHeight);
            ctx.clip();
            ctx.fillStyle = c.ansiColors[colorIndex];
            ctx.fillText(String.fromCharCode(i), i * cellWidth, y);
            ctx.restore();
        }
    }
    ctx.restore();
    if (!('createImageBitmap' in self)) {
        var bitmap = canvas.transferToImageBitmap();
        _this.postMessage({ bitmap: bitmap });
        return;
    }
    var charAtlasImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var r = parseInt(c.background.substr(1, 2), 16);
    var g = parseInt(c.background.substr(3, 2), 16);
    var b = parseInt(c.background.substr(5, 2), 16);
    clearColor(charAtlasImageData, r, g, b);
    var promise = self.createImageBitmap(charAtlasImageData);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    promise.then(function (bitmap) {
        _this.postMessage({ bitmap: bitmap });
    });
}, false);
function clearColor(imageData, r, g, b) {
    for (var offset = 0; offset < imageData.data.length; offset += 4) {
        if (imageData.data[offset] === r &&
            imageData.data[offset + 1] === g &&
            imageData.data[offset + 2] === b) {
            imageData.data[offset + 3] = 0;
        }
    }
}

//# sourceMappingURL=CharAtlasWorker.js.map
