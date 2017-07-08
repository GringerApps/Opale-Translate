NSAlert = class NSAlert {
  static alloc() {
    return this.instance();
  }

  static instance() {
    if (this._instance === undefined) {
      this._instance = new NSAlert();
    }
    return this._instance;
  }

  static reset() {
    this._instance = new NSAlert();
  }

  static new() {
      return this.alloc().init();
  }

  constructor() {
    this._init = false;
    this._open = false;
    this._messageText = null;
    this._informativeText = null;
    this._accessoryView = null;
  }

  init() {
    this._init = true;
    return this;
  }

  setMessageText(messageText) {
    this._messageText = messageText;
  }

  setInformativeText(informativeText) {
    this._informativeText = informativeText;
  }

  get informativeText () { return this._informativeText; }

  get messageText () { return this._messageText; }

  setAccessoryView(view) {
    this._accessoryView = view;
  }

  runModal() {
    this._open = true;
  }
}
