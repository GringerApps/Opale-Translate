describe("Iterator", () => {
  const Iterator = require('../i18n.sketchplugin/Contents/Sketch/Iterator');

  let iterator;
  let textLayer;
  let page;
  let artboard;
  let group;

  beforeEach(function () {
    textLayer = new Text();
    page = new Page([textLayer]);
    artboard = new Artboard([]);
    group = new Group([]);
    iterator = new Iterator([page, artboard, group]);
  });

  describe(".length", () => {
    it("should returns the length", () => {
      expect(iterator.length).toEqual(3);
    });
  });

  describe(".count()", () => {
    it("should returns the length", () => {
      expect(iterator.count()).toEqual(3);
    });
  });

  describe(".toArray()", () => {
    it("should returns an array with only top level layers", () => {
      const expectedResult = [page, artboard, group];

      const iteratedLayers = iterator.toArray();

      expect(iteratedLayers).toEqual(expectedResult);
    });

    it("should returns an array with all layers with deep", () => {
      const expectedResult = [page, textLayer, artboard, group];

      const iteratedLayers = iterator.toArray(true);

      expect(iteratedLayers).toEqual(expectedResult);
    });
  });

  describe(".map()", () => {
    it("should map only top level layers", () => {
      const expectedResult = [false, true, false];

      const result = iterator.map((layer) => {
        return layer.isArtboard;
      });

      expect(result).toEqual(expectedResult);
    });

    it("should iterate all layers with deep", () => {
      const expectedResult = [page, textLayer, artboard, group];

      const iteratedLayers = [];
      iterator.forEach((layer) => {
        iteratedLayers.push(layer);
      }, true);

      expect(iteratedLayers).toEqual(expectedResult);
    });
  });

  describe(".forEach()", () => {
    it("should iterate only on top level layers", () => {
      const expectedResult = [page, artboard, group];

      const iteratedLayers = [];
      iterator.forEach((layer) => {
        iteratedLayers.push(layer);
      });

      expect(iteratedLayers).toEqual(expectedResult);
    });

    it("should iterate all layers with deep", () => {
      const expectedResult = [page, textLayer, artboard, group];

      const iteratedLayers = [];
      iterator.forEach((layer) => {
        iteratedLayers.push(layer);
      }, true);

      expect(iteratedLayers).toEqual(expectedResult);
    });
  });

  describe(".filter()", () => {
    it("should filter based on the predicate", () => {
      const expectedResult = [page];

      const iteratedLayers = iterator.filter((layer) => layer.isPage).toArray();

      expect(iteratedLayers).toEqual(expectedResult);
    });

    it("should filter all layers with deep", () => {
      const expectedResult = [textLayer];

      const iteratedLayers = iterator.filter((layer) => layer.isText, true).toArray();

      expect(iteratedLayers).toEqual(expectedResult);
    });
  });
});
