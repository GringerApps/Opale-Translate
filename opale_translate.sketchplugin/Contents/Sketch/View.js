class View {
  static get LAYOUT_TYPE() {
    return {
      FRAME: 0,
      CONSTRAINTS: 1
    };
  }

  constructor(nativeView = null) {
    this._subviews = [];
    this._nativeView = nativeView || NSView.alloc().initWithFrame(NSMakeRect(0, 0, 0, 0));
    this.setLayoutType(this.constructor.LAYOUT_TYPE.CONSTRAINTS);
  }

  get nativeView() {
    return this._nativeView;
  }

  setFrame(frame) {
    this.nativeView.setFrame(frame);
  }

  addSubview(subview) {
    this._subviews.push(subview);
    this.nativeView.addSubview(subview.nativeView);
  }

  addVisualConstraint(constraintStr, mapping) {
    const nativeMapping = {};
    Object.keys(mapping).forEach(function(key) {
      nativeMapping[key] = mapping[key].nativeView;
    });
    const constraints = NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views_(constraintStr, 0, null, nativeMapping);
    this.nativeView.addConstraints(constraints);
  }

  addConstraint(opts) {
    opts = Object.assign({ multiplier: 1, constant: 0, relatedBy: NSLayoutRelationEqual }, opts);
    const { to, attr, relatedBy, multiplier, constant } = opts;
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      this.nativeView, attr, relatedBy, to && to.nativeView, attr, multiplier, constant
    ).setActive(true);
  }

  setLayoutType(type) {
    const frameType = this.constructor.LAYOUT_TYPE.FRAME;
    this.nativeView.setTranslatesAutoresizingMaskIntoConstraints(type == frameType);
  }
}

module.exports = View;
