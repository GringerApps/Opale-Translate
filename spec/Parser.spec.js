describe('parsers', () => {
  const { I18nGoParser, ExcelParser } = require('../opale_translate.sketchplugin/Contents/Sketch/Parsers');
  const fs = require('fs');

  const FIXTURES_FOLDER = 'spec/fixtures';

  describe('I18nGOParser', () => {
    it('should uses Latin 1 encoding', () => {
      const parser = new I18nGoParser();

      expect(parser.encoding).toEqual(NSUTF8StringEncoding);
    });

    describe('with a proper input', () => {
      it('should parse properly', () => {
        const fixturesFolder = `${FIXTURES_FOLDER}/i18n-go`;
        const contents = {
          fr: fs.readFileSync(`${fixturesFolder}/fr.json`, 'utf8'),
          en: fs.readFileSync(`${fixturesFolder}/en.json`, 'utf8')
        };
        const parser = new I18nGoParser();

        const expectedResult = {
          en: {
            name: 'Name'
          },
          fr: {
            name: 'Nom'
          }
        };

        expect(parser.parse(contents)).toEqual(expectedResult);
      });
    });
  });

  describe('ExcelParser', () => {
    it('should uses Latin 1 encoding', () => {
      const parser = new ExcelParser();

      expect(parser.encoding).toEqual(NSISOLatin1StringEncoding);
    });

    describe('with a proper input', () => {
      it('should parse properly', () => {
        const fixturesFolder = `${FIXTURES_FOLDER}/xlsx`;
        const contents = {
          translations: fs.readFileSync(`${fixturesFolder}/translations.xlsx`, 'latin1').toString()
        };
        const parser = new ExcelParser();

        const expectedResult = {
          en: {
            name: 'Name',
            boat: 'Boat'
          },
          fr: {
            name: 'Nom',
            boat: 'Bateau'
          }
        };

        expect(parser.parse(contents)).toEqual(expectedResult);
      });
    });
  });
});
