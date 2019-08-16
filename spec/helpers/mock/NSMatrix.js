NSMatrix = class NSMatrix {
  static alloc() {
    return this.instance();
  }

  static instance() {
    if (this._instance === undefined) {
      this._instance = new NSMatrix();
    }
    return this._instance;
  }

  static reset() {
    this._instance = new NSMatrix();
  }

  constructor() {
    this._cells = [];
  }

  initWithFrame_mode_prototype_numberOfRows_numberOfColumns(frame, mode, prototype, numberOfRows, numberOfColumns) {
    this._frame = frame;
    this._mode = mode;
    this._prototype = prototype;
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._cells = [];
    for(let i = 0; i < numberOfColumns * numberOfRows; i++) {
      const btn = NSButtonCell.alloc().init();
      btn.setButtonType(prototype._type);
      this._cells.push(btn);
    }
    return this;
  }

  setCellSize(size) {
    this._cellSize = size;
  }

  cells() {
    return this._cells;
  }

  selectCellAtRow_column(row, col) {
    return this._cells[row * this._numberOfColumns + col].setSelected(true);
  }
};
