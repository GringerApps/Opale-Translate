NSButtonCell = class NSButtonCell {
  static alloc() {
    return this.instance();
  }

  static instance() {
    if (this._instance === undefined) {
      this._instance = new NSButtonCell();
    }
    return this._instance;
  }

  static reset() {
    this._instance = new NSButtonCell();
  }

  constructor() {
    this._enabled = true;
    this._transparent = false;
    this._title = null;
    this._tag = null;
    this._selected = false;
    this._init = false;
  }

  init() {
    this._init = true;
    return this;
  }

  setButtonType(type) {
    this._type = type;
  }

  setTitle(title) {
    this._title = title;
  }

  setTag(tag) {
    this._tag = tag;
  }


  setSelected(selected) {
    this._selected = selected;
  }

  setTransparent(transparent) {
    this._transparent = transparent;
  }

  setEnabled(enabled) {
    this._enabled = enabled;
  }
};
