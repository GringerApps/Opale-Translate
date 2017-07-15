describe('ImageView', function() {
  const ImageView = require('../i18n.sketchplugin/Contents/Sketch/ImageView');
  const Context = require('./helpers/mock/context');

  beforeEach(() => {
    NSImageView.reset();
    NSImage.reset();
  });

  describe ('constructor', () => {
    it('create an NSImage view', () => {
      const ctx = new Context();
      const imgView = new ImageView(ctx);
      const nativeView = imgView.nativeView;

      expect(nativeView._imageAlignment).toEqual(2);
      expect(nativeView._imageScaling).toEqual(0);
    });
  });

  describe ('setImageFromResource', () => {
    it('sets the image', () => {
      const ctx = new Context();
      const imgView = new ImageView(ctx);
      const nativeView = imgView.nativeView;

      imgView.setImageFromResource('test.png');
      expect(nativeView._image).toEqual(NSImage.alloc().initWithContentsOfURL('resource/test.png'));
    });
  });
});
