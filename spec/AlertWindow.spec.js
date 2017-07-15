describe('AlertWindow', function() {
  const AlertWindow = require('../opale_translate.sketchplugin/Contents/Sketch/AlertWindow');

  beforeEach(() => COSAlertWindow.reset());

  describe('new AlertWindow()', () => {
    it('creates a COAlertWindow', () => {
      new AlertWindow('test');

      const window = COSAlertWindow.instance();

      expect(window._messageText).toEqual('test');
      expect(window._views).toEqual([new Button('OK')]);
      expect(window._informativeText).toEqual(null);
      expect(window._open).toEqual(false);
    });
  });

  describe('show()', () => {
    it('opens the window and set the message', () => {
      const alert = new AlertWindow('test');

      const window = COSAlertWindow.instance();

      alert.show('I\'m a message');

      expect(window._messageText).toEqual('test');
      expect(window._views).toEqual([new Button('OK')]);
      expect(window._informativeText).toEqual('I\'m a message');
      expect(window._open).toEqual(true);
    });
  });
});
