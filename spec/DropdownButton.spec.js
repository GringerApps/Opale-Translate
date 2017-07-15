describe('DropdownButton', function() {
  const DropdownButton = require('../opale_translate.sketchplugin/Contents/Sketch/DropdownButton');

  beforeEach(() => {
    NSPopUpButton.reset();
  });

  describe ('constructor', () => {
    it('sets the button type, style and title', () => {
      const button = new DropdownButton();
      const nativeView = button.nativeView;

      expect(nativeView.pullsdown).toEqual(false);
    });
  });

  describe('onSelectionChanged', () => {
    it('should set the selection changed callback', () => {
      const button = new DropdownButton();
      const nativeView = button.nativeView;

      let idx = -1;
      let title = -1;
      button.onSelectionChanged((i, t) => {
        idx = i;
        title = t;
      });
      button.addItem('item1');
      button.addItem('item2');

      nativeView._indexOfSelectedItem = 0;
      nativeView._titleOfSelectedItem = 'item1';
      nativeView._executeAction();

      expect(idx).toEqual(0);
      expect(title).toEqual('item1');
    });
  });

  describe ('addItem', () => {
    it('add a single item', () => {
      const button = new DropdownButton();
      const nativeView = button.nativeView;

      button.addItem('item1');

      expect(nativeView._items).toEqual(['item1']);
    });
  });

  describe ('addItems', () => {
    it('add a single item', () => {
      const button = new DropdownButton();
      const nativeView = button.nativeView;

      button.addItems(['item1', 'items2']);

      expect(nativeView._items).toEqual(['item1', 'items2']);
    });
  });
});
