 class Window {
   constructor({x , y, w, h} = { x: 0, y: 0, w: 300, h: 1}) {
     this._views = []
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

  addTextLabelWithValue(value) {
    const tf = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 300, 16));

    tf.setDrawsBackground(false);
    tf.setEditable(false);
    tf.setBezeled(false);
    tf.setSelectable(true);

    if (value) {
        tf.setStringValue(value);
    }

    this.addAccessoryView(tf);
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

  addTextFieldWithValue(value) {
    const tf = NSTextField.alloc.initWithFrame(NSMakeRect(0, 0, 300, 24));

    if (value) {
        tf.setStringValue(value);
    }

    this.addAccessoryView(tf);
  }



  runModal() {
    this._layout();

    return this._alert.runModal();
  }
}

module.exports = Window;
