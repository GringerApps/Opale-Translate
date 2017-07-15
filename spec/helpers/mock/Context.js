class Api {
  resourceNamed(name) {
    return 'resource/' + name;
  }
}

class Context {
  api() {
    return new Api();
  }
}

module.exports = Context;
