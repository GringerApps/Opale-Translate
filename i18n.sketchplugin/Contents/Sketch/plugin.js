const Iterator = require("./Iterator");
const { I18nGoParser, ExcelParser } = require("./Parsers");
const AlertWindow = require("./AlertWindow");
const FilePicker = require("./FilePicker")
const Delegator = require("./Delegator");

const CONSTANTS = {
  TITLE: "Opal Translate",
  MESSAGES: {
    WRONG_SELECTION: "Only Artboards can be translated by this plugin",
    EMPTY_SELECTION: "Please select an artboard to be translated",
    NO_FILE_SELECTED: "Please select at least a translation file",
  }
};

translate = (context) => {
  const parser = new ExcelParser();
  const ALERT = new AlertWindow(CONSTANTS.TITLE);
  const api = context.api();
  const selectedLayers = api.selectedDocument.selectedLayers;
  const selection = new Iterator(selectedLayers);

  if (selection.count() == 0) {
    ALERT.show(CONSTANTS.MESSAGES.EMPTY_SELECTION);
    return;
  }

  const artboards = selection.filter((layer) => layer.isArtboard);

  if (artboards.count() != selection.count()) {
    ALERT.show(CONSTANTS.MESSAGES.WRONG_SELECTION);
    return;
  }

  var window = new Window();

  const btn = new FilePickerBtn("Select a spreadsheet");
  btn.addToWindow(window);

  const imageUrl = resourceNamed()

  const applyToSelector = new DropdownButton();
  applyToSelector.setLabel("Apply to:", DropdownButton.LABEL_HALIGN, DropdownButton.LABEL_TEXTALIGN_RIGHT);
  applyToSelector.addItems(["Selected artboards", "Artboards in current page"]);
  applyToSelector.onSelectionChanged((a,b) => {log(a); log(b)});
  applyToSelector.addToWindow(window);


  const newArtboardToSelector = new DropdownButton();
  newArtboardToSelector.setLabel("New artboard to the:", DropdownButton.LABEL_HALIGN, DropdownButton.LABEL_TEXTALIGN_RIGHT);
  newArtboardToSelector.addItems(["Right", "Bottom"]);
  newArtboardToSelector.onSelectionChanged((a,b) => {log(a); log(b)});
  newArtboardToSelector.addToWindow(window);

  const caseMatchingSelector = new DropdownButton();
  caseMatchingSelector.setLabel("Case matching:", DropdownButton.LABEL_HALIGN, DropdownButton.LABEL_TEXTALIGN_RIGHT);
  caseMatchingSelector.addItems(["Case incensitive", "Case sensitive"]);
  caseMatchingSelector.onSelectionChanged((a,b) => {log(a); log(b)});
  caseMatchingSelector.addToWindow(window);
  window.setMessageText("Geode Translate");
  window.setInformativeText("Duplicates your artboards and replaces the text in them using the text in a spreadsheet file (.xls, .xlsx or .ods)");

  alert = window.runModal();

  const translatedContent = parser.parse(fileSelectButton.files());

  artboards.forEach((layer) => {
    for (let key in translatedContent) {
      const translations = translatedContent[key];

      const duplicatedLayer = layer.duplicate();
      duplicatedLayer.name = duplicatedLayer.name + "-" + key;

      const iterator = new Iterator([duplicatedLayer]);
      const texts = iterator.filter((layer) => layer.isText, true);
      texts.forEach((layer) => {
        const text = layer.text;
        const translation = translations[text] || text;
        layer.text = translation;
      });
    }
  });
};

const FILE_PICKER_DELEGATOR = new Delegator({
  "pickFile": () => {
    const fileReader = new FilePicker();
    fileReader.show();

    var fp = new FilePicker();
    fp.show();
    this._files = fp.files();
  },
  "files": () => {
    return this._files || [];
  }
});

class FilePickerBtn {
  constructor(label){
    const target = FILE_PICKER_DELEGATOR.getClassInstance();
    const btn = NSButton.buttonWithTitle_target_action_("Select file", target, "pickFile");
    btn.setHighlighted(true);

    this._btn = btn;
    this._label = label || null;
  }

  files() {
    return this.target.files();
  }

  addToWindow(window) {
    const btn = this._btn;
    let tf;
    const view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 30));
    const tfFrame = NSMakeRect(0, 0, 130, 20);

    if (this._label) {
      tf = NSTextField.alloc().initWithFrame(tfFrame);
      tf.setDrawsBackground(false);
      tf.setEditable(false);
      tf.setBezeled(false);
      tf.setSelectable(true);
      tf.setStringValue(this._label);
    }

    var btnFrame = btn.bounds();

    const btnOrigin = NSMakePoint(
      tfFrame.origin.x + tfFrame.size.width,
      (NSHeight(view.bounds()) - NSHeight(btnFrame)) / 2
    )

    btn.setFrameOrigin(btnOrigin);
    btn.setAutoresizingMask(NSViewMinYMargin | NSViewMaxYMargin);

    if (tf != null) {
      const tfOrigin = NSMakePoint(
        tf.frame().origin.x,
        (NSHeight(view.bounds()) - NSHeight(tf.bounds())) / 2
      );

      tf.setFrameOrigin(tfOrigin);
      tf.setAutoresizingMask(NSViewMinYMargin | NSViewMaxYMargin);

      view.addSubview(tf);
    }

    view.addSubview(btn);

    window.addAccessoryView(view);
  }
}
