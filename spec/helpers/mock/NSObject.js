NSObject = class NSObject {
  static alloc() {
    const instance = new this();
    this.instances().push(instance);
    return instance;
  }

  static instances() {
    if (this._instances === undefined || this._instances === []) {
      this._instances = [];
    }
    return this._instances;
  }

  static reset() {
    this._instances = [];
  }

  constructor() {
    this._init = false;
  }

  init() {
    this._init = true;
    return this;
  }
};
