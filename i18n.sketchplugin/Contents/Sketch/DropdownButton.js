const Delegator = require('./Delegator');
const View = require('./View');

class DropdownButton extends View {
  constructor(pullsDown = false) {
    const btn = NSPopUpButton.alloc().init();
    btn.pullsdown = pullsDown;
    super(btn);

    const self = this;
    const NSPopUpButtonDelegator = new Delegator({
      callback: () => {
        self._selectionChanged();
      }
    });
    const delegator = NSPopUpButtonDelegator.getClassInstance();

    btn.setAction('callback');
    btn.setTarget(delegator);

    this._selectionChangedCallback = () => {};
  }

  _selectionChanged() {
    const idx = this.nativeView.indexOfSelectedItem();
    const title = this.nativeView.titleOfSelectedItem();
    this._selectionChangedCallback(idx, title);
  }

  onSelectionChanged(callback) {
    this._selectionChangedCallback = callback;
    return this;
  }

  addItem(title) {
    this.nativeView.addItemWithTitle(title);
    return this;
  }

  addItems(titles) {
    this.nativeView.addItemsWithTitles(titles);
    return this;
  }
}

module.exports = DropdownButton;
