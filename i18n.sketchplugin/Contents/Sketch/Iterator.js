var ArrayWrapper = function (array) {
  var iterate = function (callback) {
    for (var i = 0; i < array.length; i++) {
      callback(array[i]);
    }
  }
  return {
    iterate: iterate,
    length: array.length
  };
};

Iterator = function (list) {
  if (list.length === undefined) {
    list = [list];
  }
  if (list.constructor === Array) {
    list = new ArrayWrapper(list);
  }

  var iterateOnLayer = function (layer, callback) {
    callback(layer);
    if (layer.isGroup) {
      layer.iterate(function (sublayer) {
        iterateOnLayer(sublayer, callback);
      });
    }
  };

  var iterate = function (callback, deep) {
    list.iterate(function (layer) {
      if (deep) {
        iterateOnLayer(layer, callback);
      } else {
        callback(layer);
      }
    });
  }
  var forEach = function (callback, deep) {
   iterate(callback, deep);
  };

  var filter = function (predicate, deep) {
    var result = [];
    iterate(function (layer) {
      if (predicate(layer)) {
        result.push(layer);
      }
    }, deep);
    return new Iterator(result);
  };

  var map = function (callback, deep) {
    var result = [];
    iterate(function (layer) {
      result.push(callback(layer));
    }, deep);
    return result;
  };

  var toArray = function (deep) {
    var result = [];
    iterate(function (layer) {
      result.push(layer);
    }, deep)
    return result;
  }

  var count = function () {
    return list.length;
  };

  var length = list.length;

  return {
    toArray: toArray,
    forEach: forEach,
    filter: filter,
    map: map,
    count: count,
    length: length
  };
}
