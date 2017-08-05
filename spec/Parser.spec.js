describe('parsers', () => {
  const { ExcelParser } = require('../opale_translate.sketchplugin/Contents/Sketch/Parsers');
  const fs = require('fs');

  const FIXTURES_FOLDER = 'spec/fixtures';

  describe('ExcelParser', () => {
    it('should uses Latin 1 encoding', () => {
      const parser = new ExcelParser();

      expect(parser.encoding).toEqual(NSISOLatin1StringEncoding);
    });

    describe('with a proper input', () => {
      it('should parse properly', () => {
        const fixturesFolder = `${FIXTURES_FOLDER}/xlsx`;
        const contents = fs.readFileSync(`${fixturesFolder}/translations.xlsx`, 'latin1').toString();
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

        parser.setContent(contents);
        expect(parser.parse()).toEqual(expectedResult);
      });
    });
  });
});
