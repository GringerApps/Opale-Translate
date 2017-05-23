class Delegator {
  constuctor(selectorHandlerDict, superclass) {
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
    const handlerHasBeenSet = (selectorString in handlers);
    const selector = NSSelectorFromString(selectorString);

    this.handlers[selectorString] = func;

    if (!handlerHasBeenSet) {
      const args = [];
      const regex = /:/g;
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length);
      }

      const dynamicFunction = eval('(function (' + args.join(', ') + ') { return handlers[selectorString].apply(this, arguments); })');

      this.delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction);
    }
  }

  removeHandlerForSelector(selectorString) {
    delete this.handlers[selectorString];
  }

  getHandlerForSelector(selectorString) {
    return this.handlers[selectorString];
  }

  getAllHandlers() {
    return this.handlers;
  }

  getClass() {
    return NSClassFromString(this.uniqueClassName);
  }

  getClassInstance() {
    return NSClassFromString(this.uniqueClassName).new();
  }
}
