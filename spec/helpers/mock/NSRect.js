require('./NSPoint');
require('./NSSize');

NSRect = class NSRect {
  constructor(origin, size) {
    this.origin = origin;
    this.size = size;
  }
};

NSMakeRect = (x, y, w, h) => {
  return new NSRect(new NSPoint(x, y), new NSSize(w, h));
};

NSWidth = (r) => r.size.width;
NSHeight = (r) => r.size.height;