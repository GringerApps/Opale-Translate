var XLSX = require("xlsx");
var { TextEncoder } = require("text-encoding");

var I18nGoParser = function() {
  var parse = function (content) {
    var result = {}
    for (var key in content) {
      var translations = JSON.parse(content[key]);
      var mappedTranslations = {};
      for (var i = 0; i < translations.length; i++) {
        var translation = translations[i];
        mappedTranslations[translation.id] = translation.translation;
      }
      result[key] = mappedTranslations;
    }
    return result;
  };

  return {
    encoding: NSUTF8StringEncoding,
    parse: parse
  };
};

var ExcelParser = function () {
  var parse = function (content) {
    var result = {}
    for (var key in content) {
      var fileContent = String(content[key]);
      var workbook = XLSX.read(fileContent, { type: "binary" });
      var sheetName = workbook.SheetNames[0];
      var sheet = workbook.Sheets[sheetName];
      var translations = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      var headers = translations[0];
      for (var i = 1; i < headers.length; i++) {
        var language = headers[i];
        result[language] = {};
      }
      for (var i = 1; i < translations.length; i++) {
        var mapping = translations[i];
        for (var j = 1; j < mapping.length; j++) {
          var language = headers[j];
          var key = mapping[0];
          var translation = mapping[j];
          result[language][key] = translation;
        }
      }
    }
    return result;
  };

  return {
    encoding: NSISOLatin1StringEncoding,
    parse: parse
  };
};

module.exports = {
  I18nGoParser: I18nGoParser,
  ExcelParser: ExcelParser
}
