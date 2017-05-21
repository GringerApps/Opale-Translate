NSRect = class NSRect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

NSMakeRect = (x, y, w, h) => {
  return new NSRect(x, y, w, h);
};
