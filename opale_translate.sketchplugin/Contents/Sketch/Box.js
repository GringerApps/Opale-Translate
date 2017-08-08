const View = require('./View');
const ImageView = require('./ImageView');
const TextField = require('./TextField');

class Box extends View {
  constructor(context) {
    const box = NSBox.alloc().init();
    super(box);
    box.setFillColor(NSColor.colorWithRed_green_blue_alpha(1, 0.92, 0.68, 1.0));
    box.setBorderColor(NSColor.colorWithRed_green_blue_alpha(0.89, 0.69, 0.18, 1.0));
    box.setBorderType(NSBezelBorder);
    box.setBorderWidth(1);
    box.setCornerRadius(5);
    box.setBoxType(NSBoxCustom);
    box.setTitlePosition(NSNoTitle);

    const view = new View();
    box.setContentView(view.nativeView);

    const warningImage = new ImageView(context);
    warningImage.setImageFromResource('alert_icn.png');
    view.addSubview(warningImage);

    this._textField = new TextField('');
    view.addSubview(this._textField);

    this._textField.addConstraint({ to: warningImage, attr: NSLayoutAttributeHeight, relatedBy: NSLayoutRelationEqual });
    view.addVisualConstraint('H:|-0-[img]-(-8)-[tf]->=0-|', { img: warningImage, tf: this._textField });
    view.addVisualConstraint('V:|->=0-[tf]->=0-|', { img: warningImage, tf: this._textField });
    view.addVisualConstraint('V:|->=0-[img]->=0-|', { img: warningImage, tf: this._textField });
  }

  setHidden(hidden) {
    this.nativeView.setHidden(hidden);
  }

  setText(text) {
    this._textField.setText(text);
  }
}

module.exports = Box;

