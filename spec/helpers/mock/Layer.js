class Layer {
  get isGroup() {
    return false;
  }

  get isArtboard() {
    return false;
  }

  get isPage() {
    return false;
  }

  get isText() {
    return false;
  }
}

Group = class Group extends Layer {
  constructor(layers) {
    super();
    this.layers = layers;
  }

  iterate(callback) {
    for(let i = 0; i < this.layers.length; i++) {
      callback(this.layers[i]);
    }
  }

  get isGroup() {
    return true;
  }
};

Page = class Page extends Group {
  get isPage() {
    return true;
  }
};

Artboard = class Artboard extends Group {
  get isArtboard() {
    return true;
  }
};

Text = class Text extends Layer {
  get isText() {
    return true;
  }
};
