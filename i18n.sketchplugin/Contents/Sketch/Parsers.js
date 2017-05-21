const XLSX = require("xlsx");
const { TextEncoder } = require("text-encoding");

class I18nGoParser {
  get encoding() {
    return NSUTF8StringEncoding;
  }

  parse(content) {
    const result = {};
    for (let key in content) {
      const translations = JSON.parse(content[key]);
      const mappedTranslations = {};
      for (let i = 0; i < translations.length; i++) {
        const translation = translations[i];
        mappedTranslations[translation.id] = translation.translation;
      }
      result[key] = mappedTranslations;
    }
    return result;
  }
}

class ExcelParser {
  get encoding() {
    return NSISOLatin1StringEncoding;
  }

  parse(content) {
    const result = {}
    for (let key in content) {
      const fileContent = String(content[key]);
      const workbook = XLSX.read(fileContent, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const translations = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const headers = translations[0];
      for (let i = 1; i < headers.length; i++) {
        const language = headers[i];
        result[language] = {};
      }
      for (let i = 1; i < translations.length; i++) {
        const mapping = translations[i];
        for (let j = 1; j < mapping.length; j++) {
          const language = headers[j];
          const key = mapping[0];
          const translation = mapping[j];
          result[language][key] = translation;
        }
      }
    }
    return result;
  }
}

module.exports = {
  I18nGoParser,
  ExcelParser
};
