let i = 0;

onmessage = (event: MessageEvent) => {
  console.log('onmessage', event);
  const arr = new Uint32Array(event.data);
  arr[i++/* index */ * 3/* CELL_SIZE */ + 1/* Cell.FG */] = 0x4000000;
  postMessage('ack');
};
