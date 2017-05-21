describe("RadioButtons", function() {
  const RadioButtons = require('../i18n.sketchplugin/Contents/Sketch/RadioButtons');

  beforeEach(() => {
    COSAlertWindow.reset();
    NSMatrix.reset();
  });

  describe("new RadioButtons()", () => {
    it("should creates a NSPopUpButton with pullsDown set to false", () => {
      const opts = [
        {
          title: "test1",
          selected: true
        },
        {
          title: "test2"
        },
        {
          title: "test3"
        }
      ];
      const buttons = new RadioButtons(opts);

      const matrix = NSMatrix.instance();

      const createButtonCell = () => {
        const btn = NSButtonCell.alloc().init();
        btn.setButtonType(NSRadioButton);
        return btn;
      };

      const selectedBtn = createButtonCell();
      selectedBtn.setSelected(true);

      const lastBtn = createButtonCell();
      lastBtn.setTransparent(true);
      lastBtn.setEnabled(false);

      expect(matrix._frame).toEqual(NSMakeRect(20, 20, 300, 50));
      expect(matrix._mode).toEqual(NSRadioModeMatrix);
      expect(matrix._cells).toEqual([selectedBtn, createButtonCell(), createButtonCell(), lastBtn]);
      expect(matrix._numberOfRows).toEqual(2);
      expect(matrix._numberOfColumns).toEqual(2);
    });
  });

  describe("addToWindow()", () => {
    it("should creates a NSPopUpButton with pullsDown set to false", () => {
      const opts = [
        {
          title: "test1",
          selected: true
        },
        {
          title: "test2"
        },
        {
          title: "test3"
        }
      ];
      const buttons = new RadioButtons(opts);

      const matrix = NSMatrix.instance();

      const window = COSAlertWindow.instance();

      buttons.addToWindow(window);

      expect(window._views).toEqual([matrix]);
    });

    describe("when label is set", () => {
      it("should creates a NSPopUpButton with pullsDown set to false", () => {
        const opts = [
          {
            title: "test1",
            selected: true
          },
          {
            title: "test2"
          },
          {
            title: "test3"
          }
        ];
        const buttons = new RadioButtons(opts);

        const matrix = NSMatrix.instance();

        const window = COSAlertWindow.instance();

        buttons.addLabel("Matrix reloaded");
        buttons.addToWindow(window);

        expect(window._views).toEqual([new Label("Matrix reloaded"), matrix]);
      });
    });
  });
});
