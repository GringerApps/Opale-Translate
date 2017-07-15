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
    return this.panel.filenames();
  }
}

module.exports = FilePicker;
