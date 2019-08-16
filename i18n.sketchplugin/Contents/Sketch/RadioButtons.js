class RadioButtons {
  constructor(options) {
    const rows = Math.ceil(options.length / 2);
    const columns = ((options.length < 2) ? 1 : 2);
    const buttonCell = NSButtonCell.alloc().init();
    buttonCell.setButtonType(NSRadioButton);

    const frame = NSMakeRect(20.0, 20.0, 300.0, rows * 25);
    const cellSize = NSMakeSize(140, 20);

    const buttonMatrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(frame, NSRadioModeMatrix, buttonCell, rows, columns);

    buttonMatrix.setCellSize(cellSize);

    for (let i = 0; i < options.length; i++) {
      const cell = buttonMatrix.cells()[i];
      cell.setTitle(options[i].title);
      cell.setTag(i);
      if(options[i].selected) {
        const selectedRow = Math.floor(i / 2);
        const selectedColumn = i - (selectedRow * 2);
        buttonMatrix.selectCellAtRow_column(selectedRow, selectedColumn);
      }
    }

    if (rows*columns > options.length) {
      const lastCell = buttonMatrix.cells()[options.length - 1];
      lastCell.setTransparent(true);
      lastCell.setEnabled(false);
    }

    this.label = null;
    this.buttonMatrix = buttonMatrix;
  }

  addLabel(label) {
    this.label = label;
  }

  addToWindow(window) {
    if (this.label !== null) {
      window.addTextLabelWithValue(this.label);
    }
    window.addAccessoryView(this.buttonMatrix);
  }
}

module.exports = RadioButtons;
