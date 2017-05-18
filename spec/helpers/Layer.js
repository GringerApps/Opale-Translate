var Layer = function (name) {
  this._name = name;
};

Layer.prototype = {
  class: function () { return this._name() },
  isGroup: false,
  isArtboard: false,
  isPage: false,
  isText: false,
};

Group = function (layers) {
  this._layers = layers;
  Layer.call(this, function () { return Group });
};
Group.prototype = Object.create(Layer.prototype);
Group.prototype.constructor = Group;
Group.prototype.iterate = function (callback) {
  for( var i = 0; i < this._layers.length; i++) {
    callback(this._layers[i]);
  }
}
Group.prototype.isGroup = true;

Page = function (layers) {
  Group.call(this, layers, function () { return Page });
};
Page.prototype = Object.create(Group.prototype);
Page.prototype.constructor = Page;
Page.prototype.isPage = true;

Artboard = function (layers) {
  Group.call(this, layers, function () { return Artboard });
};
Artboard.prototype = Object.create(Group.prototype);
Artboard.prototype.constructor = Artboard;
Artboard.prototype.isArtboard = true;

Text = function () {
  Layer.call(this, function () { return TextLayer });
};
Text.prototype = Object.create(Layer.prototype);
Text.prototype.constructor = Text;
Text.prototype.isText = true;
