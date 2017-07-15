require('./NSObject');

NSOpenPanel = class NSOpenPanel extends NSObject {
  static openPanel() {
    return this.alloc();
  }

  constructor() {
    super();
    this._filenames = [];
    this._result = NSFileHandlingPanelCancelButton;
    this._open = false;
    this._canChooseFiles = null;
    this._canChooseDirectories = null;
    this._allowsMultipleSelection = null;
  }

  filenames () {
    return this._filenames;
  }

  runModal() {
    this._open = true;
    return this._result;
  }

  setCanChooseFiles(value) {
    this._canChooseFiles = value;
  }

  setCanChooseDirectories(value) {
    this._canChooseDirectories = value;
  }

  setAllowsMultipleSelection(value) {
    this._allowsMultipleSelection = value;
  }
};
