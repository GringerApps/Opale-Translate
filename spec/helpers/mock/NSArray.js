require('./NSObject');

NSArray = class NSArray extends NSObject {
  constructor() {
    super();
    this._idx = 0;
  }

  _push(obj) {
    this[this._idx++] = obj;
  }

  count() {
    return this._idx;
  }
};
