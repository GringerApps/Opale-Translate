NSPopUpButton = class NSPopUpButton {
  static alloc() {
    return this.instance();
  }

  static instance() {
    if (this._instance === undefined) {
      this._instance = new NSPopUpButton();
    }
    return this._instance;
  }

  static reset() {
    this._instance = new NSPopUpButton();
  }

  constructor(){
    this._frame = null;
    this._pullsDown = false;
    this._items = [];
  }

  initWithFrame_pullsDown(frame, pullsDown) {
    this._frame = frame;
    this._pullsDown = pullsDown;
    return this;
  }

  addItemWithTitle(title) {
    this._items.push(title);
  }

  addItemsWithTitles(titles) {
    let self = this;
    titles.forEach((title) => self.addItemWithTitle(title));
  }
}
