const Delegator = require("./Delegator");

class DropdownButton {
  static get ALIGNMENT() {
    return {
      HORIZONTAL: 0,
      VERTICAL: 1
    };
  }
  static get TEXT_ALIGNMENT() {
    return {
      LEFT: 0,
      RIGHT: 1
    };
  }

  constructor(pullsDown = false) {
    const FRAME = NSMakeRect(0, 0, 160.0, 22);

    const self = this;
    const NSPopUpButtonDelegator = new Delegator({
      callback: () => {
        self._selectionChanged();
      }
    });
    const delegator = NSPopUpButtonDelegator.getClassInstance();

    const popupBtn = NSPopUpButton.alloc().initWithFrame_pullsDown(FRAME, pullsDown);
    popupBtn.setAction("callback");
    popupBtn.setTarget(delegator);

    this._selectionChangedCallback = () => {};
    this._btn = popupBtn;
    this._label = {
      alignment: DropdownButton.ALIGNMENT.HORIZONTAL,
      title: null,
      text_alignment:DropdownButton.TEXT_ALIGNMENT.LEFT
    };
  }

  _selectionChanged() {
    const idx = this._btn.indexOfSelectedItem();
    const title = this._btn.titleOfSelectedItem();
    this._selectionChangedCallback(idx, title);
  }

  _hasLabel() {
    return this._label.title !== null;
  }

  _valign() {
    return this._label.alignment === DropdownButton.ALIGNMENT.VERTICAL;
  }

  onSelectionChanged(callback) {
    this._selectionChangedCallback = callback;
    return this;
  }

  setLabel(title, alignment, text_alignment) {
    if (alignment !== undefined) {
      this._label.alignment = alignment;
    }
    if (text_alignment !== undefined) {
      this._label.text_alignment = text_alignment;
    }
    this._label.title = title;
    return this;
  }

  addItem(title) {
    this._btn.addItemWithTitle(title);
    return this;
  }

  addItems(titles) {
    this._btn.addItemsWithTitles(titles);
    return this;
  }

  addToWindow(window) {
    const btn = this._btn;
    const frame = this._hasLabel() && this._valign() ? NSMakeRect(0, 0, 300, 37) : NSMakeRect(0, 0, 300, 23);
    const view = NSView.alloc().initWithFrame(frame);

    let x = 0;
    let y = 0;

    let tf;

    if (this._hasLabel()) {
      const tfFrame = NSMakeRect(x, y, 140, 16);
      tf = NSTextField.alloc().initWithFrame(tfFrame);
      tf.setDrawsBackground(false);
      tf.setEditable(false);
      tf.setBezeled(false);
      tf.setSelectable(true);
      tf.setStringValue(this._label.title);
      tf.setAlignment(this._label.text_alignment);
      tf.setFont(NSFont.systemFontOfSize(11.5));

      if(this._valign()) {
        y += NSHeight(tfFrame);
      } else {
        const tfOrigin = NSMakePoint(x, (NSHeight(frame) - NSHeight(tfFrame)) / 2);
        tf.setFrameOrigin(tfOrigin);
        tf.setAutoresizingMask(NSViewMinYMargin | NSViewMaxYMargin);
        x += NSWidth(tfFrame);
      }
      view.addSubview(tf);
    }

    var btnFrame = btn.bounds();1
    if (this._valign()) {
      btn.setFrameOrigin(NSMakePoint(x, y));
    } else {
      const btnOrigin = NSMakePoint(x, (NSHeight(frame) - NSHeight(btnFrame)) / 2);
      btn.setFrameOrigin(btnOrigin);
      btn.setAutoresizingMask(NSViewMinYMargin | NSViewMaxYMargin);
    }

    view.addSubview(btn);
    window.addAccessoryView(view);
  }
}

module.exports = DropdownButton;
