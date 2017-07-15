describe("FilePickerButton", function() {
  const FilePickerButton = require('../i18n.sketchplugin/Contents/Sketch/FilePickerButton');
  const { VisualConstraint } = require("./helpers/mock/NSLayoutConstraint");

  beforeEach(() => {
    NSButton.reset();
    NSTextField.reset();
    NSOpenPanel.reset();
  });

  describe ('constructor', () => {
    it('builds the component', () => {
      const view = new FilePickerButton("Yo");
      const nativeView = view.nativeView;
      const nativeTextField = NSTextField.instance();
      const nativeButton = NSButton.instance();

      const viewsMapping = { button: nativeButton, label: nativeTextField };
      const constraint1 = new VisualConstraint({ format: 'H:|-0-[label]-[button]->=0-|', options: 0, metrics: null, views: viewsMapping });
      const constraint2 = new VisualConstraint({ format: 'V:|->=0-[label]->=0-|', options: 0, metrics: null, views: viewsMapping });
      const constraint3 = new VisualConstraint({ format: 'V:|->=0-[button]->=0-|', options: 0, metrics: null, views: viewsMapping });

      expect(nativeView._subViews).toEqual([nativeTextField, nativeButton]);
      expect(nativeTextField._stringValue).toEqual("Yo");
      expect(nativeButton._title).toEqual("Select file");
      expect(nativeButton._highlighted).toEqual(true);
      expect(nativeView._constraints).toEqual([constraint1, constraint2, constraint3]);
    });
  });

  describe ('setLabel', () => {
    it('sets the text of the text field', () => {
      const view = new FilePickerButton("Yo");
      const nativeView = view.nativeView;
      const nativeTextField = NSTextField.instance();

      view.setLabel("Yoyo");

      expect(nativeTextField._stringValue).toEqual("Yoyo");
    });
  });

  describe ('onFileSelected', () => {
    describe ('when files are selected', () => {
      it('calls the callback', () => {
        const view = new FilePickerButton("Yo");

        const openPanel = NSOpenPanel.instance();
        openPanel._result = NSFileHandlingPanelOKButton;
        openPanel._filenames.push('./test.xslx');

        let valueSet = false;
        view.onFileSelected(() => {
          valueSet = true;
        });
        view._button.nativeView._executeAction();

        expect(valueSet).toEqual(true);
      });
    });

    describe ('when no file is selected', () => {
      it('does not call the callback', () => {
        const view = new FilePickerButton("Yo");

        const openPanel = NSOpenPanel.instance();
        openPanel._result = NSFileHandlingPanelCancelButton;

        let valueSet = false;
        view.onFileSelected(() => {
          valueSet = true;
        });
        view._button.nativeView._executeAction();

        expect(valueSet).toEqual(false);
      });
    });
  });
});
