const View = require('./View');

class ImageView extends View {
  constructor(context) {
    const imgView = NSImageView.alloc().init();
    imgView.setImageAlignment(2);
    imgView.setImageScaling(0);
    super(imgView);
    this._context = context;
    this._imageCache = {};
  }

  setImageFromResource(resourceName) {
    if (this._imageCache.hasOwnProperty(resourceName)) {
      const cachedImg = this._imageCache[resourceName];
      this.nativeView.setImage();
    }
    const url = this._context.api().resourceNamed(resourceName);
    const img = NSImage.alloc().initWithContentsOfURL(url);
    this._imageCache[resourceName] = img;
    this.nativeView.setImage(img);
  }
}

module.exports = ImageView;
