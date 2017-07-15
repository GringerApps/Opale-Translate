const View = require('./View');

class Row extends View {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this.nativeView.addSubview(left.nativeView);
    this.nativeView.addSubview(right.nativeView);
    this.addVisualConstraint('H:|-0-[left]-[right]->=0-|', { left: left, right: right });
    this.addVisualConstraint('V:|-0-[left]-0-|', { left: left });
    this.addVisualConstraint('V:|-0-[right]-0-|', { right: right });
  }

  alignWith(row) {
    this.left.addConstraint({ to: row.left, attr: NSLayoutAttributeWidth, relatedBy: NSLayoutRelationEqual });
    this.right.addConstraint({ to: row.right, attr: NSLayoutAttributeWidth, relatedBy: NSLayoutRelationEqual });
  }
}

module.exports = Row;
