require('./NSView');

NSPopUpButton = class NSPopUpButton extends NSView {
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
    super();
    this._frame = null;
    this.pullsdown = false;
    this._items = [];
    this._action = null;
    this._target = null;
    this._indexOfSelectedItem = 0;
    this._titleOfSelectedItem = "";
  }

  initWithFrame_pullsDown(frame, pullsDown) {
    this._frame = frame;
    this._pullsDown = pullsDown;
    return this;
  }

  indexOfSelectedItem() {
    return this._indexOfSelectedItem;
  }

  titleOfSelectedItem() {
    return this._items[this.indexOfSelectedItem()];
  }

  addItemWithTitle(title) {
    this._items.push(title);
    return this;
  }

  addItemsWithTitles(titles) {
    let self = this;
    titles.forEach((title) => self.addItemWithTitle(title));
    return this;
  }

  setAction(action) {
    this._action = action;
    return this;
  }

  setTarget(target) {
    this._target = target;
    return this;
  }
};
