describe("DropdownButton", function() {
  const DropdownButton = require('../i18n.sketchplugin/Contents/Sketch/DropdownButton');

  beforeEach(() => {
    COSAlertWindow.reset();
    NSPopUpButton.reset();
  });

  describe("new DropdownButton()", () => {
    describe("with pullsDown set", () => {
      it("should creates a NSPopUpButton with pullsDown set to false", () => {
        const button = new DropdownButton(true);

        const nsBtn = NSPopUpButton.instance();

        expect(nsBtn._frame).toEqual(new NSRect(20.0, 20.0, 300.0, 25));
        expect(nsBtn._pullsDown).toEqual(true);
      });
    });

    it("should creates a NSPopUpButton with pullsDown set to false", () => {
      const button = new DropdownButton();

      const nsBtn = NSPopUpButton.instance();

      expect(nsBtn._frame).toEqual(new NSRect(20.0, 20.0, 300.0, 25));
      expect(nsBtn._pullsDown).toEqual(false);
    });
  });

  describe("addItem()", () => {
    it("should add a single item", () => {
      const button = new DropdownButton();

      const nsBtn = NSPopUpButton.instance();

      button.addItem("test");

      expect(nsBtn._items).toEqual(["test"]);
    });
  });

  describe("addItems()", () => {
    it("should add a single item", () => {
      const button = new DropdownButton();

      const nsBtn = NSPopUpButton.instance();

      button.addItems(["test1", "test2"]);

      expect(nsBtn._items).toEqual(["test1", "test2"]);
    });
  });

  describe("addToWindow()", () => {
    describe("when a label was added", () => {
      it("should add a label item", () => {
        const button = new DropdownButton();

        const nsBtn = NSPopUpButton.instance();
        const window = COSAlertWindow.instance();

        button.addLabel("YOLO");
        button.addToWindow(window);

        const expectedLabel = new Label("YOLO")

        expect(window._views).toEqual([expectedLabel, nsBtn]);
      });
    });

    it("should add a single item", () => {
      const button = new DropdownButton();

      const nsBtn = NSPopUpButton.instance();
      const window = COSAlertWindow.instance();

      button.addToWindow(window);

      expect(window._views).toEqual([nsBtn]);
    });
  });
});
