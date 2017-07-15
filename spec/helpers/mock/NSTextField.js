require('./NSView');

NSTextField = class NSTextField extends NSView {
  setDrawsBackground(drawsBackground) {
    this._drawsBackground = drawsBackground;
    return this;
  }

  setEditable(editable) {
    this._editable = editable;
    return this;
  }

  setBezeled(bezeled) {
    this._bezeled = bezeled;
    return this;
  }

  setSelectable(selectable) {
    this._selectable = selectable;
    return this;
  }

  setStringValue(stringValue) {
    this._stringValue = stringValue;
    return this;
  }

  setAlignment(alignment) {
    this._alignment = alignment;
    return this;
  }
};
