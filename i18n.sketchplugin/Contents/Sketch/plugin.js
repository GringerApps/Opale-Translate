var Iterator = require("./Iterator");
var { I18nGoParser, ExcelParser } = require("./Parser");

var CONSTANTS = {
  TITLE: "Sketch i18n",
  MESSAGES: {
    WRONG_SELECTION: "Only Artboards can be translated by this plugin",
    EMPTY_SELECTION: "Please select an artboard to be translated",
    NO_FILE_SELECTED: "Please select at least a translation file",
  }
};

var translate = function (context, parser) {
  var ALERT = new AlertWindow(CONSTANTS.TITLE);
  var selectedLayers = context.api().selectedDocument.selectedLayers;
  var selection = new Iterator(selectedLayers);

  if (selection.count() == 0) {
    ALERT.show(CONSTANTS.MESSAGES.EMPTY_SELECTION);
    return;
  }

  var artboards = selection.filter(function (layer) {
    return layer.isArtboard;
  });

  if (artboards.count() != selection.count()) {
    ALERT.show(CONSTANTS.MESSAGES.WRONG_SELECTION);
    return;
  }

  var fileReader = new FilePicker();
  fileReader.show();
  if (!fileReader.choseFiles()) {
    ALERT.show(CONSTANTS.MESSAGES.NO_FILE_SELECTED);
    return;
  }
  var content = fileReader.read(parser.encoding);

  var translatedContent = parser.parse(content);

  artboards.forEach(function (layer) {
    for (var key in translatedContent) {
      var translations = translatedContent[key];

      var duplicatedLayer = layer.duplicate();
      duplicatedLayer.name = duplicatedLayer.name + "-" + key;

      var iterator = new Iterator([duplicatedLayer]);
      var texts = iterator.filter(function (layer) {
        return layer.isText;
      }, true);
      texts.forEach(function (layer) {
        var text = layer.text;
        var translation = translations[text] || text;
        layer.text = translation;
      });
    }
  });
};

var FilePicker = function () {
  var panel = NSOpenPanel.openPanel();
  panel.setCanChooseFiles(true);
  panel.setCanChooseDirectories(false);
  panel.setAllowsMultipleSelection(true);

  var files = [];
  var modelResult = NSCancelButton;

  var show = function () {
    modelResult = panel.runModal();
  };

  var choseFiles = function () {
    return modelResult == NSOKButton && panel.filenames().length != 0;
  };

  var read = function (encoding) {
    if (encoding === undefined) {
      encoding = NSUTF8StringEncoding;
    }

    var result = {};
    if (!choseFiles()) {
      return result;
    }
    var filenames = panel.filenames();
    for (i = 0; i < filenames.length; i++) {
      var fullpath = filenames[i];

      var content = NSString.alloc().initWithContentsOfFile_encoding_error_(fullpath, encoding, null);
      var filename = fullpath.split('\\').pop().split('/').pop().replace(/\.[^/.]+$/, "");
      result[filename] = content;
    }
    return result;
  };

  return {
    choseFiles: choseFiles,
    show: show,
    read: read
  };
};

var AlertWindow = function (title) {
  var window = COSAlertWindow.new();

  window.setMessageText(title);
  window.addButtonWithTitle("OK");

  var show = function (message) {
    window.setInformativeText(message);
    window.runModal();
  }

  return {
    show: show
  };
};

translateFromJSONGo = function (context) {
  translate(context, new I18nGoParser());
};

translateFromExcel = function (context) {
  translate(context, new ExcelParser());
};
