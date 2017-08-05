const FilePicker = require('./FilePicker');
const View = require('./View');
const Button = require('./Button');
const TextField = require('./TextField');

const DEFAULT_BUTTON_TITLE = 'Select file';
const REPLACE_BUTTON_TITLE = 'Replace file';

class FilePickerButton extends View {
  constructor(labelText, buttonTitle = DEFAULT_BUTTON_TITLE) {
    super();

    const self = this;
    this._button = new Button(buttonTitle);
    this._button.onClick(() => self._onClick());
    this._button.setHighlighted(true);

    this._labelText = labelText;
    this._label = new TextField(labelText);

    this._filePicker = new FilePicker();

    this._onFileSelected = () => {};

    this.addSubview(this._label);
    this.addSubview(this._button);

    const constraintMapping = {
      button: this._button,
      label: this._label
    };
    this.addVisualConstraint('H:|-0-[label]-[button]->=0-|', constraintMapping);
    this.addVisualConstraint('V:|->=0-[label]->=0-|', constraintMapping);
    this.addVisualConstraint('V:|->=0-[button]->=0-|', constraintMapping);
  }

  _onClick() {
    const picker = this._filePicker;
    picker.show();
    if(picker.choseFiles()) {
      this.setFiles(picker.files());
    }
  }

  setFiles(files) {
    if(files.length === 0) {
      this.setLabel(this._labelText);
      this._button.setTitle(DEFAULT_BUTTON_TITLE);
      this._button.setHighlighted(true);
      return;
    }
    this._button.setTitle(REPLACE_BUTTON_TITLE);
    this._button.setHighlighted(false);

    this._onFileSelected(files);
  }

  setLabel(label) {
    this._label.setText(label);
  }

  onFileSelected(callback) {
    this._onFileSelected = callback;
  }
}

module.exports = FilePickerButton;
