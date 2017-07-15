class Window {
  constructor() {
    const x = 0, y = 0, w = 500, h = 300;
    this._views = [];
    this._frame = NSMakeRect(x, y, w, h);
    this._alert = NSAlert.new();
  }

  _layout() {
    if (!this._views) {
      return;
    }

    let height = 0;
    const sup = NSView.alloc().initWithFrame(this._frame);

    this._views.reverse().forEach((view) => {
      const currentFrame = view.bounds();

      currentFrame.origin.y = height;

      height += currentFrame.size.height + 8;

      view.setFrame(currentFrame);

      sup.addSubview(view);
    });

    const viewFrame = sup.frame();
    if (viewFrame.size.height <= height) {
      viewFrame.size.height = height;
    }

    sup.setFrame(viewFrame);
    this._alert.setAccessoryView(sup);
  }

  addAccessoryView(view) {
    this._views.push(view);
  }

  setMessageText(messageText) {
    this._alert.setMessageText(messageText);
  }

  setInformativeText(informativeText) {
    this._alert.setInformativeText(informativeText);
  }

  messageText() {
    return this._alert.messageText;
  }

  informativeText() {
    return this._alert.informativeText;
  }

  addButtonWithTitle(title) {
    this._alert.addButtonWithTitle(title);
    return this;
  }

  buttons() {
    return this._alert.buttons();
  }

  close() {
    NSApp.endSheet(this._alert.window());
  }

  runModal() {
    this._layout();

    return this._alert.runModal();
  }
}

module.exports = Window;
