class Delegator {
  constructor(selectorHandlerDict, superclass) {
    this.uniqueClassName = 'Delegator_DynamicClass_' + NSUUID.UUID().UUIDString();
    this.delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(this.uniqueClassName, superclass || NSObject);
    this.delegateClassDesc.registerClass();
    this.handlers = {};

    if (typeof selectorHandlerDict === 'object') {
      for (let selectorString in selectorHandlerDict) {
        this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString]);
      }
    }
  }

  setHandlerForSelector(selectorString, func) {
    const handlerHasBeenSet = (selectorString in this.handlers);
    const selector = NSSelectorFromString(selectorString);

    this.handlers[selectorString] = func;

    if (!handlerHasBeenSet) {
      const args = [];
      const regex = /:/g;
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length);
      }
      const handlers = this.handlers;
      const dynamicFunction = eval('(function (' + args.join(', ') + ') { return handlers[selectorString].apply(this, arguments); })');

      this.delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction);
    }
  }

  getClassInstance() {
    const instance = NSClassFromString(this.uniqueClassName).alloc().init();
    return instance;
  }
}

module.exports = Delegator;
