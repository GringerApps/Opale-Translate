class AlertWindow {
  constructor(title) {
    const window = COSAlertWindow.new();

    window.setMessageText(title);
    window.addButtonWithTitle("OK");

    this.window = window;
  }

  show(message) {
    this.window.setInformativeText(message);
    this.window.runModal();
  }
}

module.exports = AlertWindow;
