const CLASS_REGISTRY = {};

Mocha = function () {}
NSSelectorFromString = (s) => s;
NSClassFromString = (s) => CLASS_REGISTRY[s];

MOClassDescription = class MOClassDescription {
  static allocateDescriptionForClassWithName_superclass_(name, superclass) {
    return new MOClassDescription(name, superclass);
  }

  constructor(name, superclass) {
    this._name = name;
    this._class = (class extends superclass {});
  }

  registerClass() {
    CLASS_REGISTRY[this._name] = this._class;
  }

  addInstanceMethodWithSelector_function_(selector, func) {
    this._class.prototype[selector] = func;
  }
}