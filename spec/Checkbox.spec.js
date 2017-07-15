describe('Checkbox', function() {
  const Checkbox = require('../opale_translate.sketchplugin/Contents/Sketch/Checkbox');

  beforeEach(() => {
    NSButton.reset();
  });

  describe ('constructor', () => {
    it('sets the button type, style and title', () => {
      const button = new Checkbox('Yo', true);
      const nativeButton = button.nativeView;

      expect(nativeButton._title).toEqual('Yo');
      expect(nativeButton._buttonType).toEqual(NSSwitchButton);
      expect(nativeButton.state()).toEqual(NSOnState);
    });
  });

  describe('onSelectionChanged', () => {
    it('should set the click callback', () => {
      const button = new Checkbox('Yo');
      const nativeButton = button.nativeView;

      let valueSet = false;

      button.onSelectionChanged((checked) => {
        valueSet = checked;
      });

      nativeButton._state = NSOnState;
      nativeButton._executeAction();
      expect(valueSet).toEqual(true);
    });
  });

  describe ('setChecked', () => {
    it('sets the native view state', () => {
      const button = new Checkbox('Yo');
      const nativeButton = button.nativeView;

      button.setChecked(true);

      expect(nativeButton.state()).toEqual(NSOnState);
    });
  });
});
