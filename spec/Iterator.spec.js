describe("Player", function() {
  require('../i18n.sketchplugin/Contents/Sketch/Iterator');

  var iterator;
  var textLayer;
  var page;
  var artboard;
  var group;

  beforeEach(function () {
    textLayer = new Text();
    page = new Page([textLayer]);
    artboard = new Artboard([]);
    group = new Group([]);
    iterator = new Iterator([page, artboard, group]);
  });

  describe(".length", function() {
    it("should returns the length", function() {
      expect(iterator.length).toEqual(3);
    });
  });

  describe(".count()", function() {
    it("should returns the length", function() {
      expect(iterator.count()).toEqual(3);
    });
  });

  describe(".toArray()", function() {
    it("should returns an array with only top level layers", function() {
      var expectedResult = [page, artboard, group];

      var iteratedLayers = iterator.toArray();

      expect(iteratedLayers).toEqual(expectedResult);
    });

    it("should returns an array with all layers with deep", function() {
      var expectedResult = [page, textLayer, artboard, group];

      var iteratedLayers = iterator.toArray(true);

      expect(iteratedLayers).toEqual(expectedResult);
    });
  });

  describe(".map()", function() {
    it("should map only top level layers", function() {
      var expectedResult = [false, true, false];

      var result = iterator.map(function (layer) {
        return layer.isArtboard;
      });

      expect(result).toEqual(expectedResult);
    });

    it("should iterate all layers with deep", function() {
      var expectedResult = [page, textLayer, artboard, group];

      var iteratedLayers = [];
      iterator.forEach(function (layer) {
        iteratedLayers.push(layer);
      }, true);

      expect(iteratedLayers).toEqual(expectedResult);
    });
  });

  describe(".forEach()", function() {
    it("should iterate only on top level layers", function() {
      var expectedResult = [page, artboard, group];

      var iteratedLayers = [];
      iterator.forEach(function (layer) {
        iteratedLayers.push(layer);
      });

      expect(iteratedLayers).toEqual(expectedResult);
    });

    it("should iterate all layers with deep", function() {
      var expectedResult = [page, textLayer, artboard, group];

      var iteratedLayers = [];
      iterator.forEach(function (layer) {
        iteratedLayers.push(layer);
      }, true);

      expect(iteratedLayers).toEqual(expectedResult);
    });
  });

  describe(".filter()", function() {
    it("should filter based on the predicate", function() {
      var expectedResult = [page];

      var iteratedLayers = iterator.filter(function (layer) {
        return layer.isPage;
      }).toArray();

      expect(iteratedLayers).toEqual(expectedResult);
    });

    it("should filter all layers with deep", function() {
      var expectedResult = [textLayer];

      var iteratedLayers = iterator.filter(function (layer) {
        return layer.isText;
      }, true).toArray();

      expect(iteratedLayers).toEqual(expectedResult);
    });
  });
});
