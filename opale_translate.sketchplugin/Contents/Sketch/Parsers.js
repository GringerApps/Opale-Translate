const XLSX = require('xlsx');

class ExcelParser {
  constructor(parseHeader = true) {
    this._parserHeader = parseHeader;
    this._content = null;
  }

  get encoding() {
    return NSISOLatin1StringEncoding;
  }

  setParseHeader(parseHeader) {
    this._parserHeader = parseHeader;
  }

  setContent(content) {
    this._content = XLSX.read(String(content), { type: 'binary' });
  }

  parse() {
    const result = {};
    if (this._content === null) {
      return result;
    }
    const sheetName = this._content.SheetNames[0];
    const sheet = this._content.Sheets[sheetName];
    const translations = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = this._parserHeader ? translations.shift() : translations[0].map((_, i) => i.toString());
    for (let i = 1; i < headers.length; i++) {
      const language = headers[i];
      result[language] = {};
    }
    for (let i = 0; i < translations.length; i++) {
      const mapping = translations[i];
      for (let j = 1; j < mapping.length; j++) {
        const language = headers[j];
        const key = mapping[0];
        const translation = mapping[j];
        result[language][key] = translation;
      }
    }
    return result;
  }
}

module.exports = {
  ExcelParser
};
