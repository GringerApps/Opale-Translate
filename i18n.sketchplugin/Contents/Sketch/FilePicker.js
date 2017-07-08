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
    this.modalResult = this.panel.runModal();
  };

  choseFiles() {
    return this.modalResult == NSFileHandlingPanelOKButton && this.panel.filenames().length != 0;
  };

  files() {
    return this.panel.filenames();
  }
}

module.exports = FilePicker;
