describe("AlertWindow", function() {
  const AlertWindow = require('../i18n.sketchplugin/Contents/Sketch/AlertWindow');

  beforeEach(() => COSAlertWindow.reset());

  describe("new AlertWindow()", () => {
    it("creates a COAlertWindow", () => {
      const alert = new AlertWindow("test");

      const window = COSAlertWindow.instance();

      expect(window._messageText).toEqual("test");
      expect(window._views).toEqual([new Button("OK")]);
      expect(window._informativeText).toEqual(null);
      expect(window._open).toEqual(false);
    });
  });

  describe("show()", () => {
    it("opens the window and set the message", () => {
      const alert = new AlertWindow("test");

      const window = COSAlertWindow.instance();

      alert.show("I'm a message")

      expect(window._messageText).toEqual("test");
      expect(window._views).toEqual([new Button("OK")]);
      expect(window._informativeText).toEqual("I'm a message");
      expect(window._open).toEqual(true);
    });
  });
});
