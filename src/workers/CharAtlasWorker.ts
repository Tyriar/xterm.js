import { generateCharAtlas, ICharAtlasRequest } from '../shared/CharAtlasGenerator';

declare const OffscreenCanvas: any;
declare const self: any;

self.addEventListener('message', e => {
  const canvasFactory = (width: number, height: number) => new OffscreenCanvas(width, height);
  const request: ICharAtlasRequest = e.data;
  const result = generateCharAtlas(self, canvasFactory, request);

  // This is a safe cast as OffscreenCanvas is guarenteed to generate a Promise<ImageBitmap>
  (<Promise<ImageBitmap>>result).then(bitmap => {
    self.postMessage({ bitmap });
    close();
  });
});
