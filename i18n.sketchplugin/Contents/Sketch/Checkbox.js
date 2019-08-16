const View = require('./View');
const Delegator = require('./Delegator');

class Checkbox extends View {
  constructor(title) {
    const checkBox = NSButton.alloc().init();
    checkBox.setTitle(title);
    checkBox.setButtonType(NSSwitchButton);
    super(checkBox);
    const self = this;
    const NSButtonDelegator = new Delegator({
      callback: () => self._selectionChanged()
    });
    const delegator = NSButtonDelegator.getClassInstance();
    checkBox.setTarget(delegator);
    checkBox.setAction('callback');
    this._onSelectionChanged = () => {};
  }

  _selectionChanged() {
    this._onSelectionChanged(this.nativeView.state() == NSOnState);
  }

  onSelectionChanged(callback) {
    this._onSelectionChanged = callback;
  }
}
module.exports = Checkbox;
