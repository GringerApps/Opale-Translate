NSPoint = class NSPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

NSMakePoint = (x, y) => new NSPoint(x, y);