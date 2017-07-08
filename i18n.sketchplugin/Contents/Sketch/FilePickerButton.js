const FilePicker = require("./FilePicker");
const Delegator = require("./Delegator");

const DEFAULT_BUTTON_TITLE = "Select file";

class FilePickerButton {
  constructor(labelText, buttonTitle = DEFAULT_BUTTON_TITLE) {
    const self = this;
    const FILE_PICKER_DELEGATOR = new Delegator({
      "callback": () => self._onClick()
    });
    const target = FILE_PICKER_DELEGATOR.getClassInstance();
    const button = NSButton.buttonWithTitle_target_action_(buttonTitle, target, "callback");
    button.setHighlighted(true);

    const labelFrame = NSMakeRect(0, 0, 180, 20);
    const label = NSTextField.alloc().initWithFrame(labelFrame);
    label.setDrawsBackground(false);
    label.setEditable(false);
    label.setBezeled(false);
    label.setSelectable(true);
    label.setStringValue(labelText);

    this._label = label;
    this._button = button;
    this._onFileSelected = () => {};
  }

  _onClick() {
    const picker = new FilePicker();
    picker.show();
    const files = picker.files();
    this._button.setTitle("Replace file");
    this._button.setFrameSize(NSMakeSize(200, this._button.frame().size.height));
    this._label.setStringValue('Spreadsheet: ' + filename);
    this._onFileSelected(files);
  }

  setLabel(label) {
    this._label.setStringValue(label);
  }

  onFileSelected(callback) {
    this._onFileSelected = callback;
  }

  addToWindow(window) {
    const view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 400, 30));
    const button = this._button;
    const label = this._label;

    const viewFrame = view.frame();
    const buttonFrame = button.frame();
    const labelFrame = button.frame();

    const buttonOrigin = NSMakePoint(
      labelFrame.origin.x + labelFrame.size.width,
      (NSHeight(viewFrame) - NSHeight(buttonFrame)) / 2
    );
    button.setFrameOrigin(buttonOrigin);
    button.setAutoresizingMask(NSViewMinYMargin | NSViewMaxYMargin);


    const labelOrigin = NSMakePoint(
      labelFrame.origin.x,
      (NSHeight(viewFrame) - NSHeight(labelFrame)) / 2
    );
    label.setFrameOrigin(labelOrigin);
    label.setAutoresizingMask(NSViewMinYMargin | NSViewMaxYMargin);

    view.addSubview(label);
    view.addSubview(button);

    window.addAccessoryView(view);
  }
}

module.exports = FilePickerButton;
