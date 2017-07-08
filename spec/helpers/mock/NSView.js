NSViewMinYMargin = 1
NSViewMaxYMargin = 2

NSView = class NSView extends NSObject {
  constructor() {
    super()
    this._init = false;
    this._subViews = [];
    this._frame = NSMakeRect(0, 0, 0, 0);
  }

  init() {
    this._init = true;
  }

  initWithFrame(frame) {
    this.init();
    this.setFrame(frame);
    return this;
  }

  bounds() { return this._frame; }

  setFrameOrigin(origin) {
    this._frame.origin = origin;
    return this;
  }

  setFrame(frame) {
    this._frame = frame;
    return this;
  }

  addSubview(view) {
    this._subViews.push(view);
    return this;
  }

  setAutoresizingMask(autoresizingMask) {
    this._autoresizingMask = autoresizingMask;
    return this;
  }
}
