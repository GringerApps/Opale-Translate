NSLayoutConstraint = class NSLayoutConstraint {
  static constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(item, attribute, relatedBy, toItem, toAttribute, multiplier, constant) {
    const constraint = new RelativeConstraint({ item, attribute, relatedBy, toItem, toAttribute, multiplier, constant });
    item._constraints.push(constraint);
    return constraint;
  }

  static constraintsWithVisualFormat_options_metrics_views_(format, options, metrics, views) {
    return [new VisualConstraint({ format, options, metrics, views })];
  }

  constructor() {
    this._active = false;
  }

  setActive(active) {
    this._active = active;
  }
};

class RelativeConstraint extends NSLayoutConstraint {
  constructor({ item, attribute = NSLayoutAttributeWidth, relatedBy = NSLayoutRelationEqual, toItem, toAttribute = NSLayoutAttributeWidth, multiplier = 1, constant = 0}) {
    super();
    this._item = item;
    this._attribute = attribute;
    this._relatedBy = relatedBy;
    this._toItem = toItem;
    this._toAttribute = toAttribute;
    this._multiplier = multiplier;
    this._constant = constant;
  }
}

class VisualConstraint extends NSLayoutConstraint {
  constructor({ format, options = 0, metrics = null, views }) {
    super();
    this._format = format;
    this._options = options;
    this._metrics = metrics;
    this._views = views;
  }
}

module.exports = { VisualConstraint, RelativeConstraint };
