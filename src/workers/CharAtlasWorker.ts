declare const OffscreenCanvas: any;

const CHAR_ATLAS_CELL_SPACING = 1;

// this.addEventListener('message', e => {
//   console.log('worker got message', e);
//   const canvas = new OffscreenCanvas(e.data.width, e.data.height);
//   const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

//   ctx.fillStyle = '#F00';
//   ctx.fillRect(0, 0, e.data.width, e.data.height);

//   const bitmap = canvas.transferToImageBitmap();
//   this.postMessage({bitmap});
// }, false);

this.addEventListener('message', e => {
  const c = e.data;

  const cellWidth = c.scaledCharWidth + CHAR_ATLAS_CELL_SPACING;
  const cellHeight = c.scaledCharHeight + CHAR_ATLAS_CELL_SPACING;
  const canvas = new OffscreenCanvas(
    255 * cellWidth,
    (/*default+default bold*/2 + /*0-15*/16) * cellHeight
  );
  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

  ctx.fillStyle = '#0F0';//c.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.fillStyle = c.foreground;
  ctx.font = `${c.fontSize * c.devicePixelRatio}px ${c.fontFamily}`;
  ctx.textBaseline = 'top';

  // Default color
  for (let i = 0; i < 256; i++) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(i * cellWidth, 0, cellWidth, cellHeight);
    ctx.clip();
    ctx.fillText(String.fromCharCode(i), i * cellWidth, 0);
    ctx.restore();
  }
  // Default color bold
  ctx.save();
  ctx.font = `bold ${ctx.font}`;
  for (let i = 0; i < 256; i++) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(i * cellWidth, cellHeight, cellWidth, cellHeight);
    ctx.clip();
    ctx.fillText(String.fromCharCode(i), i * cellWidth, cellHeight);
    ctx.restore();
  }
  ctx.restore();

  // Colors 0-15
  ctx.font = `${c.fontSize * c.devicePixelRatio}px ${c.fontFamily}`;
  for (let colorIndex = 0; colorIndex < 16; colorIndex++) {
    // colors 8-15 are bold
    if (colorIndex === 8) {
      ctx.font = `bold ${ctx.font}`;
    }
    const y = (colorIndex + 2) * cellHeight;
    // Draw ascii characters
    for (let i = 0; i < 256; i++) {
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

  // Support is patchy for createImageBitmap at the moment, pass a canvas back
  // if support is lacking as drawImage works there too. Firefox is also
  // included here as ImageBitmap appears both buggy and has horrible
  // performance (tested on v55).
  if (!('createImageBitmap' in self) /*|| isFirefox*/) {
    // TODO: Reinstate isFirefox
    // Don't attempt to clear background colors if createImageBitmap is not supported
    const bitmap = canvas.transferToImageBitmap();
    this.postMessage({ bitmap });
    return;
  }

  const charAtlasImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Remove the background color from the image so characters may overlap
  const r = parseInt(c.background.substr(1, 2), 16);
  const g = parseInt(c.background.substr(3, 2), 16);
  const b = parseInt(c.background.substr(5, 2), 16);
  clearColor(charAtlasImageData, r, g, b);

  const promise = self.createImageBitmap(charAtlasImageData);
  // Clear the rect while the promise is in progress
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  promise.then((bitmap) => {
    this.postMessage({ bitmap });
  });
}, false);

function clearColor(imageData: ImageData, r: number, g: number, b: number): void {
  for (let offset = 0; offset < imageData.data.length; offset += 4) {
    if (imageData.data[offset] === r &&
        imageData.data[offset + 1] === g &&
        imageData.data[offset + 2] === b) {
      imageData.data[offset + 3] = 0;
    }
  }
}
