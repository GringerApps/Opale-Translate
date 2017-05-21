class DropdownButton {
  constructor(pullsDown) {
    const FRAME = NSMakeRect(20.0, 20.0, 300.0, 25);

    if (pullsDown === undefined) {
      pullsDown = false;
    }

    this.btn = NSPopUpButton.alloc().initWithFrame_pullsDown(FRAME, pullsDown);

    this.label = null;
  }

  addLabel(label) {
    this.label = label;
  }

  addItem(title) {
    this.btn.addItemWithTitle(title);
  }

  addItems(titles) {
    this.btn.addItemsWithTitles(titles);
  }

  addToWindow(window) {
    if (this.label !== null) {
      window.addTextLabelWithValue(this.label);
    }
    window.addAccessoryView(this.btn);
  }
};

module.exports = DropdownButton;
