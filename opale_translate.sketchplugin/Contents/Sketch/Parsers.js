const XLSX = require('xlsx');

class ExcelParser {
  constructor(parseHeader = true) {
    this._parserHeader = parseHeader;
    this._translations = null;
  }

  get encoding() {
    return NSISOLatin1StringEncoding;
  }

  setParseHeader(parseHeader) {
    this._parserHeader = parseHeader;
  }

  setContent(content) {
    const xlsx = XLSX.read(String(content), { type: 'binary' });
    const sheetName = xlsx.SheetNames[0];
    const sheet = xlsx.Sheets[sheetName];
    this._translations = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  }

  parse() {
    const result = {};
    if (this._translations === null) {
      return result;
    }
    const headers = this._parserHeader ? this._translations.shift() : this._translations[0].map((_, i) => i.toString());
    for (let i = 1; i < headers.length; i++) {
      const language = headers[i];
      result[language] = {};
    }
    for (let i = 0; i < this._translations.length; i++) {
      const mapping = this._translations[i];
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
