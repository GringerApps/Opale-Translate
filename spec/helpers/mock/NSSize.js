NSsize = class NSsize {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
}

NSMakeSize = (w, h) => {
  return new NSsize(w, h);
};
