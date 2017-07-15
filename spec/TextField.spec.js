describe('TextField', function() {
  const TextField = require('../opale_translate.sketchplugin/Contents/Sketch/TextField');

  beforeEach(() => {
    NSTextField.reset();
  });

  describe ('constructor', () => {
    it('sets the properties of the native text field', () => {
      const view = new TextField('Yo');
      const nativeTextField = view.nativeView;

      expect(nativeTextField._alignment).toEqual(0);
      expect(nativeTextField._drawsBackground).toEqual(false);
      expect(nativeTextField._editable).toEqual(false);
      expect(nativeTextField._bezeled).toEqual(false);
      expect(nativeTextField._selectable).toEqual(true);
      expect(nativeTextField._stringValue).toEqual('Yo');
    });

    describe ('when the alignment is given', () => {
      it('it sets the alignment', () => {
        const view = new TextField('Yo', TextField.TEXT_ALIGNMENT.RIGHT);
        const nativeTextField = view.nativeView;

        expect(nativeTextField._alignment).toEqual(1);
        expect(nativeTextField._drawsBackground).toEqual(false);
        expect(nativeTextField._editable).toEqual(false);
        expect(nativeTextField._bezeled).toEqual(false);
        expect(nativeTextField._selectable).toEqual(true);
        expect(nativeTextField._stringValue).toEqual('Yo');
      });
    });
  });

  describe ('setTextAlignment', () => {
    it('it sets the text alignment', () => {
      const view = new TextField('Yo');
      const nativeTextField = view.nativeView;

      view.setTextAlignment(TextField.TEXT_ALIGNMENT.RIGHT);

      expect(nativeTextField._alignment).toEqual(1);
    });
  });

  describe ('setDrawsBackground', () => {
    it('it sets the draws background property of the text field', () => {
      const view = new TextField('Yo');
      const nativeTextField = view.nativeView;

      view.setDrawsBackground(true);

      expect(nativeTextField._drawsBackground).toEqual(true);
    });
  });

  describe ('setEditable', () => {
    it('it sets the editable property of the text field', () => {
      const view = new TextField('Yo');
      const nativeTextField = view.nativeView;

      view.setEditable(true);

      expect(nativeTextField._editable).toEqual(true);
    });
  });

  describe ('setBezeled', () => {
    it('it sets the bezeled property of the text field', () => {
      const view = new TextField('Yo');
      const nativeTextField = view.nativeView;

      view.setBezeled(true);

      expect(nativeTextField._bezeled).toEqual(true);
    });
  });

  describe ('setSelectable', () => {
    it('it sets the selectable property of the text field', () => {
      const view = new TextField('Yo');
      const nativeTextField = view.nativeView;

      view.setSelectable(true);

      expect(nativeTextField._selectable).toEqual(true);
    });
  });

  describe ('setText', () => {
    it('it sets the stringValue property of the text field', () => {
      const view = new TextField('Yo');
      const nativeTextField = view.nativeView;

      view.setText('Yoyo');

      expect(nativeTextField._stringValue).toEqual('Yoyo');
    });
  });
});
