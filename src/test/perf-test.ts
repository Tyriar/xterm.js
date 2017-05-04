import { assert } from 'chai';
const Terminal = require('../xterm');

describe('Parser', () => {
  let terminal;
  let viewportElement;
  let charMeasure;
  let viewport;
  let scrollAreaElement;
  let charMeasureElement;

  beforeEach(() => {
    terminal = new Terminal();
  });

  it('Single character parse performance', function () {
    runTest.call(this, terminal, 500000, () => {
      terminal.writeBuffer.push('a');
      terminal.writeInProgress = true;
      terminal.innerWrite();
    });
  });
});

function reportStats(start: number, end: number, iterationCount: number) {
  console.log(`${iterationCount} iterations time: ${end - start}ms`);
  console.log(`Average iteration time : ${(end - start) / iterationCount}ms`);
}

function runTest(terminal: any, iterationCount: number, iteration: (num: number) => void, setup?: () => void) {
  this.timeout(30000);
  if (setup) {
    setup();
  }
  const start = Date.now();
  for (let i = 0; i < iterationCount; i++) {
    iteration(i);
  }
  const end = Date.now();
  reportStats(start, end, iterationCount);
}
