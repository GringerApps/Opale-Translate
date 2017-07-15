require("./NSObject");

NSImageView = class NSImageView extends NSView {
  constructor() {
    super();
    this.setImageAlignment(0);
    this.setImageScaling(0);
    this._image = null;
  }

  setImageAlignment(imageAlignment) {
    this._imageAlignment = imageAlignment;
  }

  setImageScaling(imageScaling) {
    this._imageScaling = imageScaling;
  }

  setImage(image) {
    this._image = image;
  }
};
