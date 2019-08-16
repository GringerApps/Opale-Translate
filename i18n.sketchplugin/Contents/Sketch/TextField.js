const View = require('./View');

class TextField extends View {
  static get TEXT_ALIGNMENT() {
    return {
      LEFT: 0,
      RIGHT: 1
    };
  }

  constructor(text, textAlignment = TextField.TEXT_ALIGNMENT.LEFT) {
    const textField = NSTextField.alloc().init();
    super(textField);
    this.setTextAlignment(textAlignment)
      .setDrawsBackground(false)
      .setEditable(false)
      .setBezeled(false)
      .setSelectable(true)
      .setText(text);
  }

  setTextAlignment(alignment) {
    this.nativeView.setAlignment(alignment);
    return this;
  }

  setDrawsBackground(drawsBackground) {
    this.nativeView.setDrawsBackground(drawsBackground);
    return this;
  }

  setEditable(editable) {
    this.nativeView.setEditable(editable);
    return this;
  }

  setBezeled(bezeled) {
    this.nativeView.setBezeled(bezeled);
    return this;
  }

  setSelectable(selectable) {
    this.nativeView.setSelectable(selectable);
    return this;
  }

  setText(text) {
    this.nativeView.setStringValue(text);
    return this;
  }
}

module.exports = TextField;
