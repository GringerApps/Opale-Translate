const View = require('./View');
const Delegator = require('./Delegator');

class Button extends View {
  constructor(title) {
    const button = NSButton.alloc().init();
    super(button);

    const self = this;
    const delegator = new Delegator({ 'callback': () => self._onClick() });

    button.setTitle(title);
    button.setButtonType(NSMomentaryLightButton);
    button.setBezelStyle(NSRoundedBezelStyle);
    button.setTarget(delegator.getClassInstance());
    button.setAction('callback');

    this._onClick = () => {};
  }

  onClick(callback) {
    this._onClick = callback;
  }

  setHighlighted(highlighted) {
    this.nativeView.setHighlighted(highlighted);
  }

  setTitle(title) {
    this.nativeView.setTitle(title);
  }
}

module.exports = Button;
