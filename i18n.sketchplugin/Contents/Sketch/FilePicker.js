class FilePicker {
  constructor() {
    const panel = NSOpenPanel.openPanel();
    panel.setCanChooseFiles(true);
    panel.setCanChooseDirectories(false);
    panel.setAllowsMultipleSelection(true);

    this.panel = panel;
    this.modalResult = NSFileHandlingPanelCancelButton;
  }

  show() {
    this.modalResult = this.panel.runModal();
  };

  choseFiles() {
    return this.modalResult == NSFileHandlingPanelOKButton && this.panel.filenames().length != 0;
  };

  read(encoding) {
    if (encoding === undefined) {
      encoding = NSUTF8StringEncoding;
    }

    const result = {};
    if (!this.choseFiles()) {
      return result;
    }
    const filenames = this.panel.filenames();
    for (let i = 0; i < filenames.length; i++) {
      const fullpath = filenames[i];

      const content = NSString.alloc().initWithContentsOfFile_encoding_error_(fullpath, encoding, null);
      const filename = fullpath.split('\\').pop().split('/').pop().replace(/\.[^/.]+$/, "");
      result[filename] = content;
    }
    return result;
  }
}

module.exports = FilePicker;
