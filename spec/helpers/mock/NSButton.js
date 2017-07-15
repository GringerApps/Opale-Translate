require('./NSView');

NSButton = class NSButton extends NSView {
  constructor() {
    super();
    this._title = null;
    this._highlighted = false;
    this._state = NSOffState;
  }

  setHighlighted(highlighted) {
    this._highlighted = highlighted;
  }

  setTitle(title) {
    this._title = title;
  }

  setButtonType(buttonType) {
    this._buttonType = buttonType;
  }

  setBezelStyle(bezelStyle) {
    this._bezelStyle = bezelStyle;
  }

  setState(state) {
    this._state = state;
  }

  state() {
    return this._state;
  }
};
