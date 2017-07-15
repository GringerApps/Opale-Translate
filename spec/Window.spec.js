describe('Window', function() {
  const Window = require('../i18n.sketchplugin/Contents/Sketch/Window');

  beforeEach(() => {
    NSAlert.reset();
  });

  describe('setMessageText()', () => {
    it('should set the message text', () => {
      const window = new Window();

      const alert = NSAlert.instance();

      window.setMessageText('Yo');

      expect(alert._messageText).toEqual('Yo');
    });
  });

  describe('setInformativeText()', () => {
    it('should set the message text', () => {
      const window = new Window();

      const alert = NSAlert.instance();

      window.setInformativeText('Yo');

      expect(alert._informativeText).toEqual('Yo');
    });
  });

  describe('informativeText()', () => {
    it('should set the message text', () => {
      const window = new Window();

      const alert = NSAlert.instance();

      window.setInformativeText('Yo');
      
      expect(window.informativeText()).toEqual('Yo');
    });
  });

  describe('messageText()', () => {
    it('should set the message text', () => {
      const window = new Window();

      const alert = NSAlert.instance();

      window.setMessageText('Yo');
      
      expect(window.messageText()).toEqual('Yo');
    });
  });
});
