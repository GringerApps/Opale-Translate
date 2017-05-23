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

const translate = (context, parser) => {
  const ALERT = new AlertWindow(CONSTANTS.TITLE);
  const selectedLayers = context.api().selectedDocument.selectedLayers;
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

  let files = {};

  const filePickerTargetClass = new Delegator({
    "pickFile": () => {
      const fileReader = new FilePicker();
      fileReader.show();

      var fp = new FilePicker();
      fp.show();
      files = fp.read(parser.encoding);
    }
  });

  const filePickerBtnTarget = filePickerTargetClass.getClassInstance();

  const filePickerBtn = NSButton.buttonWithTitle_target_action_("Select file", filePickerBtnTarget, "pickFile");

  const content = fileReader.read(parser.encoding);

  const translatedContent = parser.parse(content);

  const window = COSAlertWindow.new();

  window.setMessageText("Opal Translate");

  window.addAccessoryView(filePickerBtn);

  window.runModal();

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

translateFromJSONGo = (context) => {
  translate(context, new I18nGoParser());
};

translateFromExcel = (context) => {
  translate(context, new ExcelParser());
};
