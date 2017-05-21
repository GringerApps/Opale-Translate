describe("FilePicker", function() {
  const FilePicker = require('../i18n.sketchplugin/Contents/Sketch/FilePicker');
  const fs = require('fs');
  const path = require('path');

  beforeEach(() => NSOpenPanel.reset());

  describe("new FilePicker()", () => {
    it("initialize values", () => {
      const picker = new FilePicker();

      const panel = NSOpenPanel.instance();

      expect(panel._canChooseFiles).toEqual(true);
      expect(panel._canChooseDirectories).toEqual(false);
      expect(panel._allowsMultipleSelection).toEqual(true);
      expect(panel._open).toEqual(false);
    });
  });

  describe("show()", () => {
    it('should open the modal', () => {
      const picker = new FilePicker();

      const panel = NSOpenPanel.instance();

      expect(panel._open).toEqual(false);

      picker.show();

      expect(panel._open).toEqual(true);
    });
  });

  describe("choseFiles()", () => {
    describe("when the panel hasn't been opened yet", () => {
      it("should return false", () => {
        const picker = new FilePicker();

        const panel = NSOpenPanel.instance();

        expect(picker.choseFiles()).toEqual(false);
      });
    });

    describe("when the panel has been opened and the files have been chosen", () => {
      it("should return false", () => {
        const picker = new FilePicker();

        const panel = NSOpenPanel.instance();
        panel._result = NSFileHandlingPanelOKButton;
        panel._filenames = ["test.json"];

        picker.show();

        expect(picker.choseFiles()).toEqual(true);
      });
    });

    describe("when the panel has been opened and the files have not been chosen", () => {
      it("should return false", () => {
        const picker = new FilePicker();

        const panel = NSOpenPanel.instance();
        panel._result = NSFileHandlingPanelCancelButton;
        panel._filenames = [];

        picker.show();

        expect(picker.choseFiles()).toEqual(false);
      });
    });
  });

  describe("read()", () => {
    describe("when no file has been chosen", () => {
      it("should return an empty object", () => {
        const picker = new FilePicker();

        const panel = NSOpenPanel.instance();

        expect(picker.read()).toEqual({});
      });
    });

    describe("when a file has been chosen", () => {
      it("should use utf-8 encoding", () => {
        const picker = new FilePicker();

        const panel = NSOpenPanel.instance();

        const enFilename = path.join(__dirname, 'fixtures', 'i18n-go', 'en.json');
        const frFilename = path.join(__dirname, 'fixtures', 'i18n-go', 'fr.json');
        panel._filenames = [enFilename, frFilename];
        panel._result = NSFileHandlingPanelOKButton;

        picker.show();

        const expectedResult = {
          en: fs.readFileSync(enFilename, "utf-8"),
          fr: fs.readFileSync(frFilename, "utf-8")
        };

        expect(picker.read()).toEqual(expectedResult);
      });
    });

    describe("when you specify the encoding", () => {
      it("should use the given encoding", () => {
        const picker = new FilePicker();

        const panel = NSOpenPanel.instance();

        const filename = path.join(__dirname, 'fixtures', 'xlsx', 'translations.xlsx');
        panel._filenames = [filename];
        panel._result = NSFileHandlingPanelOKButton;

        picker.show();

        const expectedResult = {
          translations: fs.readFileSync(filename, "binary"),
        };

        expect(picker.read(NSISOLatin1StringEncoding)).toEqual(expectedResult);
      });
    });
  });
});
