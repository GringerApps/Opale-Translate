NSSize = class NSSize {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
};

NSMakeSize = (w, h) => {
  return new NSSize(w, h);
};