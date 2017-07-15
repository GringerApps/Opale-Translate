class ArrayWrapper {
  constructor(array) {
    this.array = array;
  }

  get length() {
    return this.array.length;
  }

  iterate(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this.array[i]);
    }
  }
}

class Iterator {
  constructor(list) {
    if (list.length === undefined) {
      list = [list];
    }
    if (list.constructor === Array) {
      list = new ArrayWrapper(list);
    }
    this.list = list;
    this.length = list.length;
  }

  _iterateOnLayer(layer, callback) {
    callback(layer);
    if (layer.isGroup) {
      const self = this;
      layer.iterate(function (sublayer) {
        self._iterateOnLayer(sublayer, callback);
      });
    }
  }

  iterate(callback, deep) {
    const self = this;
    this.list.iterate(function (layer) {
      if (deep) {
        self._iterateOnLayer(layer, callback);
      } else {
        callback(layer);
      }
    });
  }

  forEach(callback, deep) {
    this.iterate(callback, deep);
  }

  filter(predicate, deep) {
    const result = [];
    this.iterate((layer) => {
      if (predicate(layer)) {
        result.push(layer);
      }
    }, deep);
    return new Iterator(result);
  }

  map(callback, deep) {
    const result = [];
    this.iterate((layer) => {
      result.push(callback(layer));
    }, deep);
    return result;
  }

  toArray(deep) {
    const result = [];
    this.iterate((layer) => {
      result.push(layer);
    }, deep);
    return result;
  }

  count() {
    return this.list.length;
  }
}

module.exports = Iterator;
