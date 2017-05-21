const Iterator = require("./Iterator");
const { I18nGoParser, ExcelParser } = require("./Parsers");
const AlertWindow = require("./AlertWindow");
const FilePicker = require("./FilePicker")

const CONSTANTS = {
  TITLE: "Sketch i18n",
  MESSAGES: {
    WRONG_SELECTION: "Only Artboards can be translated by this plugin",
    EMPTY_SELECTION: "Please select an artboard to be translated",
    NO_FILE_SELECTED: "Please select at least a translation file",
  }
};

const translate = function (context, parser) {
  const ALERT = new AlertWindow(CONSTANTS.TITLE);
  const selectedLayers = context.api().selectedDocument.selectedLayers;
  const selection = new Iterator(selectedLayers);

  if (selection.count() == 0) {
    ALERT.show(CONSTANTS.MESSAGES.EMPTY_SELECTION);
    return;
  }

  const artboards = selection.filter(function (layer) {
    return layer.isArtboard;
  });

  if (artboards.count() != selection.count()) {
    ALERT.show(CONSTANTS.MESSAGES.WRONG_SELECTION);
    return;
  }

  const fileReader = new FilePicker();
  fileReader.show();
  if (!fileReader.choseFiles()) {
    ALERT.show(CONSTANTS.MESSAGES.NO_FILE_SELECTED);
    return;
  }
  const content = fileReader.read(parser.encoding);

  const translatedContent = parser.parse(content);

  artboards.forEach(function (layer) {
    for (let key in translatedContent) {
      const translations = translatedContent[key];

      const duplicatedLayer = layer.duplicate();
      duplicatedLayer.name = duplicatedLayer.name + "-" + key;

      const iterator = new Iterator([duplicatedLayer]);
      const texts = iterator.filter(function (layer) {
        return layer.isText;
      }, true);
      texts.forEach(function (layer) {
        const text = layer.text;
        const translation = translations[text] || text;
        layer.text = translation;
      });
    }
  });
};

translateFromJSONGo = function (context) {
  translate(context, new I18nGoParser());
};

translateFromExcel = function (context) {
  translate(context, new ExcelParser());
};
