class FilePicker {
  constructor() {
    const panel = NSOpenPanel.openPanel();
    panel.setCanChooseFiles(true);
    panel.setCanChooseDirectories(false);
    panel.setAllowsMultipleSelection(false);

    this.panel = panel;
    this.modalResult = NSFileHandlingPanelCancelButton;
  }

  show() {
    const result = this.panel.runModal();
    this.modalResult = result;
    return result == NSFileHandlingPanelOKButton;
  }

  choseFiles() {
    return this.modalResult == NSFileHandlingPanelOKButton && this.panel.filenames().length != 0;
  }

  files() {
    const files = [];
    const nativeFiles = this.panel.filenames();
    for(let i = 0; i < nativeFiles.count(); i++) {
      const file = String(nativeFiles[i]).split('\\').pop();
      files.push(file);
    }
    return files;
  }
}

module.exports = FilePicker;
