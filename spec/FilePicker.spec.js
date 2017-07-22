describe('FilePicker', function() {
  const FilePicker = require('../opale_translate.sketchplugin/Contents/Sketch/FilePicker');

  beforeEach(() => {
    NSOpenPanel.reset();
  });

  describe ('constructor', () => {
    it('sets the properties of the NSOpenPanel', () => {
      new FilePicker();

      const openPanel = NSOpenPanel.instances()[0];

      expect(openPanel._canChooseFiles).toEqual(true);
      expect(openPanel._canChooseDirectories).toEqual(false);
      expect(openPanel._allowsMultipleSelection).toEqual(false);
    });
  });

  describe('show', () => {
    it('should run the modal', () => {
      const picker = new FilePicker();

      const openPanel = NSOpenPanel.instances()[0];
      openPanel._result = NSFileHandlingPanelOKButton;

      const result = picker.show();

      expect(result).toEqual(true);
      expect(openPanel._open).toEqual(true);
    });
  });

  describe('choseFiles', () => {
    describe ('when the picker has\'t been opened', () => {
      it('it returns false', () => {
        const picker = new FilePicker();

        const openPanel = NSOpenPanel.instances()[0];
        openPanel._result = NSFileHandlingPanelOKButton;

        expect(picker.choseFiles()).toEqual(false);
      });
    });

    describe ('when the picker has been opened and files were chosen', () => {
      it('it returns true', () => {
        const picker = new FilePicker();

        const openPanel = NSOpenPanel.instances()[0];
        openPanel._result = NSFileHandlingPanelOKButton;
        openPanel._filenames._push('./test.xslx');

        picker.show();

        expect(picker.choseFiles()).toEqual(true);
      });
    });

    describe ('when the picker has been opened and cancelled', () => {
      it('it returns false', () => {
        const picker = new FilePicker();

        const openPanel = NSOpenPanel.instances()[0];
        openPanel._result = NSFileHandlingPanelCancelButton;

        picker.show();

        expect(picker.choseFiles()).toEqual(false);
      });
    });
  });

  describe ('files', () => {
    describe ('when the picker has\'t been opened', () => {
      it('it returns []]', () => {
        const picker = new FilePicker();

        const openPanel = NSOpenPanel.instances()[0];
        openPanel._result = NSFileHandlingPanelOKButton;

        expect(picker.files()).toEqual([]);
      });
    });

    describe ('when the picker has been opened and files were chosen', () => {
      it('it returns an array containing the selected file', () => {
        const picker = new FilePicker();

        const openPanel = NSOpenPanel.instances()[0];
        openPanel._result = NSFileHandlingPanelOKButton;
        openPanel._filenames._push('./test.xslx');

        picker.show();

        expect(picker.files()).toEqual(['./test.xslx']);
      });
    });

    describe ('when the picker has been opened and cancelled', () => {
      it('it returns []', () => {
        const picker = new FilePicker();

        const openPanel = NSOpenPanel.instances()[0];
        openPanel._result = NSFileHandlingPanelCancelButton;

        picker.show();

        expect(picker.files()).toEqual([]);
      });
    });
  });
});
