require('./NSObject');

NSImage = class NSImage extends NSObject {
  constructor() {
    super();
    this._url = null;
  }

  initWithContentsOfURL(url) {
    this._url = url;
    return this.init();
  }
};
