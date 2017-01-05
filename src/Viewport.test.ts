declare var assert;
declare var Terminal;

const Viewport = Terminal._Viewport;

describe('Viewport', () => {
  var terminal;
  var viewportElement;
  var charMeasureElement;
  var viewport;
  var scrollAreaElement;

  const CHARACTER_HEIGHT = 10;

  beforeEach(() => {
    terminal = {
      lines: [],
      rows: 0,
      ydisp: 0,
      on: () => {},
      rowContainer: {
        style: {
          lineHeight: 0
        }
      }
    };
    const wrapper = document.querySelector('#xterm');
    viewportElement = document.createElement('div');
    scrollAreaElement = document.createElement('div');
    charMeasureElement = document.createElement('span');
      charMeasureElement.style.display = 'inline-block';
    wrapper.appendChild(viewportElement);
    wrapper.appendChild(scrollAreaElement);
    wrapper.appendChild(charMeasureElement);
    viewport = new Viewport(terminal, viewportElement, scrollAreaElement, charMeasureElement);
  });

  describe('refresh', () => {
    it('should set the line-height of the terminal', () => {
      charMeasureElement.style.height = '1px';
      viewport.refresh();
      assert.equal(viewportElement.style.lineHeight, '1px');
      assert.equal(terminal.rowContainer.style.lineHeight, '1px');
    });

    it('should set the height of the viewport when the line-height changed', () => {
      terminal.lines.push('');
      terminal.lines.push('');
      terminal.rows = 1;
      // viewport.refresh();
      // assert.equal(viewportElement.getBoundingClientRect(), 1 * CHARACTER_HEIGHT + 'px');
      charMeasureElement.style.height = '20px';
      viewport.refresh();
      assert.equal(viewportElement.style.height, 20 + 'px');
    });
  });

  describe('syncScrollArea', () => {
    it('should sync the scroll area', () => {
      terminal.lines.push('');
      terminal.rows = 1;
      //assert.equal(scrollAreaElement.style.height, 0 * CHARACTER_HEIGHT + 'px');
      viewport.syncScrollArea();
      assert.equal(viewportElement.style.height, 1 * CHARACTER_HEIGHT + 'px');
      assert.equal(scrollAreaElement.style.height, 1 * CHARACTER_HEIGHT + 'px');
      terminal.lines.push('');
      viewport.syncScrollArea();
      assert.equal(viewportElement.style.height, 1 * CHARACTER_HEIGHT + 'px');
      assert.equal(scrollAreaElement.style.height, 2 * CHARACTER_HEIGHT + 'px');
    });
  });
});
