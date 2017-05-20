describe("Player", function() {
  var { I18nGoParser, ExcelParser } = require('../i18n.sketchplugin/Contents/Sketch/Parser');
  var fs = require('fs');

  const FIXTURES_FOLDER = 'spec/fixtures';

  describe("I18nGOParser", function () {
    it('should uses Latin 1 encoding', function () {
      var parser = new I18nGoParser();

      expect(parser.encoding).toEqual(NSUTF8StringEncoding);
    });

    describe("with a proper input", function () {
      it("should parse properly", function () {
        var fixturesFolder = `${FIXTURES_FOLDER}/i18n-go`
        var contents = {
          fr: fs.readFileSync(`${fixturesFolder}/fr.json`, 'utf8'),
          en: fs.readFileSync(`${fixturesFolder}/en.json`, 'utf8')
        };
        var parser = new I18nGoParser();

        var expectedResult = {
          en: {
            name: "Name"
          },
          fr: {
            name: "Nom"
          }
        };

        expect(parser.parse(contents)).toEqual(expectedResult);
      });
    });
  });

  describe("ExcelParser", function () {
    it('should uses Latin 1 encoding', function () {
      var parser = new ExcelParser();

      expect(parser.encoding).toEqual(NSISOLatin1StringEncoding);
    });

    describe("with a proper input", function () {
      it("should parse properly", function () {
        var fixturesFolder = `${FIXTURES_FOLDER}/xslx`
        var contents = {
          translations: fs.readFileSync(`${fixturesFolder}/translations.xlsx`, "latin1").toString()
        };
        var parser = new ExcelParser();

        var expectedResult = {
          en: {
            name: "Name",
            boat: "Boat"
          },
          fr: {
            name: "Nom",
            boat: "Bateau"
          }
        };

        expect(parser.parse(contents)).toEqual(expectedResult);
      });
    });
  });
});
