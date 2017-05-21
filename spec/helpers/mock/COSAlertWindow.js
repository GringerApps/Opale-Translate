Label = class Label {
  constructor(label) {
    this.label = label;
  }
}

Button = class Button {
  constructor(title) {
    this.title = title;
  }
}

COSAlertWindow = class COSAlertWindow {
  static new() {
    return this.instance();
  }

  static instance() {
    if (this._instance === undefined) {
      this._instance = new COSAlertWindow();
    }
    return this._instance;
  }

  static reset() {
    this._instance = new COSAlertWindow();
  }

  constructor(){
    this._messageText = null;
    this._informativeText = null;
    this._views = [];
    this._open = false;
  }

  setMessageText(text) {
    this._messageText = text;
  }

  setInformativeText(message) {
    this._informativeText = message;
  }

  addButtonWithTitle(title) {
    this.addAccessoryView(new Button(title));
  }

  addTextLabelWithValue(label){
    this.addAccessoryView(new Label(label));
  }

  addAccessoryView(view) {
    this._views.push(view);
  }

  runModal() {
    this._open = true;
    return this._result;
  }
}
