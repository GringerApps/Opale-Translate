const Delegator = require("./Delegator");

class DropdownButton {
  static get LABEL_HALIGN() { return 0; }
  static get LABEL_VALIGN() { return 1; }
  static get LABEL_TEXTALIGN_LEFT() { return 0; }
  static get LABEL_TEXTALIGN_RIGHT() { return 1; }

  constructor(pullsDown = false) {
    const FRAME = NSMakeRect(20.0, 20.0, 170.0, 25);

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
      alignment: DropdownButton.LABEL_HALIGN,
      title: null,
      text_alignment:DropdownButton.LABEL_TEXTALIGN_LEFT
    }
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
    return this._label.alignment === DropdownButton.LABEL_VALIGN;
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
    const frame = this._hasLabel() && this._valign() ? NSMakeRect(0, 0, 300, 60) : NSMakeRect(0, 0, 300, 30);
    const view = NSView.alloc().initWithFrame(frame);

    let x = 0;
    let y = 0;

    let tf;

    if (this._hasLabel()) {
      const tfFrame = NSMakeRect(x, y, 130, 20);
      tf = NSTextField.alloc().initWithFrame(tfFrame);
      tf.setDrawsBackground(false);
      tf.setEditable(false);
      tf.setBezeled(false);
      tf.setSelectable(true);
      tf.setStringValue(this._label.title);
      tf.setAlignment(this._label.text_alignment);

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

    var btnFrame = btn.bounds();
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
