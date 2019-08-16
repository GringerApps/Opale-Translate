require('./NSObject');

NSViewMinYMargin = 1;
NSViewMaxYMargin = 2;

NSView = class NSView extends NSObject {
  constructor() {
    super();
    this._init = false;
    this._subViews = [];
    this._translatesAutoresizingMaskIntoConstraints = true;
    this._frame = NSMakeRect(0, 0, 0, 0);
    this._target = { none: () => {} };
    this._action = 'none';
    this._constraints = [];
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

  setTarget(target) {
    this._target = target;
  }

  setAction(action) {
    this._action = action;
  }

  setFrame(frame) {
    this._frame = frame;
    return this;
  }

  addSubview(view) {
    this._subViews.push(view);
    return this;
  }

  addConstraints(contraints) {
    this._constraints = this._constraints.concat(contraints);
  }

  setTranslatesAutoresizingMaskIntoConstraints(translatesAutoresizingMaskIntoConstraints) {
    this._translatesAutoresizingMaskIntoConstraints = translatesAutoresizingMaskIntoConstraints;
  }

  setAutoresizingMask(autoresizingMask) {
    this._autoresizingMask = autoresizingMask;
    return this;
  }

  _executeAction() {
    this._target[this._action]();
  }
};
