NSObject = class NSObject {
  static alloc() {
    return this.instance();
  }

  static instance() {
    if (this._instance === undefined) {
      this._instance = new this();
    }
    return this._instance;
  }

  static reset() {
    this._instance = new this();
  }

  constructor() {
    this._init = false;
  }

  init() {
    this._init = true;
    return this;    
  }
}