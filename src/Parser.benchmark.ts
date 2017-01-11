declare var assert;
declare var Terminal;

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
    this.timeout = 20000;
    const iterations = 500000;
    const start = Date.now();
    for (let i = 0; i < iterations; i++) {
      terminal.write('a');
    }
    const end = Date.now();
    reportStats(start, end, iterations);
  });

  it('Simple character long line parse performance', function () {
    this.timeout = 30000;
    const iterations = 500000;
    const start = Date.now();
    for (let i = 0; i < iterations; i++) {
      terminal.write('abcdefghijklmnopqrstuvwxyz1234567890`,./;\'[]\-=~!@#$%^&*()_+{}|:"<>?');
    }
    const end = Date.now();
    reportStats(start, end, iterations);
  });
});

function reportStats(start, end, iterations) {
  console.log(`${iterations} iterations time: ${end - start}ms`);
  console.log(`Average iteration time : ${(end - start) / iterations}ms`);
}
