const uuidV4 = require('uuid/v4');

NSUUID = class NSUUID {
  static UUID() { return new NSUUID(); }

  constructor() {
    this._uuid = uuidV4();
  }

  UUIDString() {
    return this._uuid;
  }
};