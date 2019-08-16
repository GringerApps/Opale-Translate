describe('Button', function() {
  const Button = require('../i18n.sketchplugin/Contents/Sketch/Button');

  beforeEach(() => {
    NSButton.reset();
  });

  describe ('constructor', () => {
    it('sets the button type, style and title', () => {
      const button = new Button('Yo');
      const nativeButton = button.nativeView;

      expect(nativeButton._title).toEqual('Yo');
      expect(nativeButton._bezelStyle).toEqual(NSRoundedBezelStyle);
      expect(nativeButton._buttonType).toEqual(NSMomentaryLightButton);
    });
  });

  describe('onClick', () => {
    it('should set the click callback', () => {
      const button = new Button('Yo');
      const nativeButton = button.nativeView;

      let valueSet = false;

      button.onClick(() => {
        valueSet = true;
      });

      nativeButton._executeAction();
      expect(valueSet).toEqual(true);
    });
  });

  describe ('setHighlighted', () => {
    it('set the highlighted property of native button', () => {
      const button = new Button('Yo');
      const nativeButton = button.nativeView;

      button.setHighlighted(true);

      expect(nativeButton._highlighted).toEqual(true);
    });

    describe ('when passing false', () => {
      it('sets to false', () => {
        const button = new Button('Yo');
        const nativeButton = button.nativeView;

        button.setHighlighted(false);

        expect(nativeButton._highlighted).toEqual(false);
      });
    });
  });

  describe ('setTitle', () => {
    it('set the title property of native button', () => {
      const button = new Button('Yo');
      const nativeButton = button.nativeView;

      button.setTitle('Yoyo!');

      expect(nativeButton._title).toEqual('Yoyo!');
    });
  });
});
