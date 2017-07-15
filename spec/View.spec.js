describe('View', function() {
  const View = require('../opale_translate.sketchplugin/Contents/Sketch/View');
  const { VisualConstraint, RelativeConstraint } = require('./helpers/mock/NSLayoutConstraint');

  beforeEach(() => {
    NSView.reset();
    NSButton.reset();
  });

  describe ('constructor', () => {
    it('sets the translatesAutoresizingMaskIntoConstraints of the native view to false', () => {
      const view = new View();
      const nativeView = view.nativeView;

      expect(nativeView._translatesAutoresizingMaskIntoConstraints).toEqual(false);
    });
  });

  describe('nativeView', () => {
    it('should return the native view', () => {
      const view = new View();
      const nativeView = view.nativeView;
      const viewSingleton = NSView.instances()[0];

      expect(nativeView).toEqual(viewSingleton);
    });

    describe('when passing a view to the constructor', () => {
      it('should return the given view', () => {
        const button = NSButton.alloc();
        const view = new View(button);
        const nativeView = view.nativeView;

        expect(nativeView).toEqual(button);
      });
    });
  });

  describe('setFrame', () => {
    it ('set the native view frame', () => {
      const view = new View();
      const frame = NSMakeRect(1, 1, 1, 1);
      const nativeView = view.nativeView;

      view.setFrame(frame);
      expect(nativeView._frame).toEqual(frame);
    });
  });

  describe ('addSubview', () => {
    it('adds a subview', () => {
      const button = new View(NSButton.instances()[0]);
      const view = new View();
      const nativeView = view.nativeView;

      view.addSubview(button);
      expect(nativeView._subViews).toEqual([button.nativeView]);
    });
  });

  describe ('addVisualConstraint', () => {
    it('it sets the visual constraints', () => {
      const button = new View(NSButton.instances()[0]);
      const view = new View();
      const nativeView = view.nativeView;

      view.addSubview(button);
      view.addVisualConstraint('|-[button]-|', { button });

      const expectedConstraint = new VisualConstraint({
        format: '|-[button]-|',
        options: 0,
        metrics: null,
        views: { button: button.nativeView }
      });
      expect(nativeView._constraints).toEqual([expectedConstraint]);
    });
  });

  describe ('addConstraint', () => {
    it('it set the contrainst', () => {
      const button = new View(NSButton.instances()[0]);
      const view = new View();
      const nativeView = view.nativeView;

      view.addSubview(button);
      view.addConstraint({
        to: button,
        attr: NSLayoutAttributeWidth,
        relatedBy: NSLayoutRelationEqual,
        multiplier: 1,
        constant: 1
      });

      const expectedConstraint = new RelativeConstraint({
        item: view.nativeView,
        attribute: NSLayoutAttributeWidth,
        relatedBy: NSLayoutRelationEqual,
        toItem: button._nativeView,
        toAttribute: NSLayoutAttributeWidth,
        multiplier: 1,
        constant: 1
      });
      expectedConstraint.setActive(true);
      expect(nativeView._constraints).toEqual([expectedConstraint]);
    });
  });

  describe ('setLayoutType', () => {
    describe('when given View.LAYOUT_TYPE.CONSTRAINTS', () => {
      it('is the translatesAutoresizingMaskIntoConstraints property of the native view to false', () => {
        const view = new View();
        const nativeView = view.nativeView;

        view.setLayoutType(View.LAYOUT_TYPE.CONSTRAINTS);
        expect(nativeView._translatesAutoresizingMaskIntoConstraints).toEqual(false);
      });
    });

    describe('when given View.LAYOUT_TYPE.FRAME', () => {
      it('is the translatesAutoresizingMaskIntoConstraints property of the native view to true', () => {
        const view = new View();
        const nativeView = view.nativeView;

        view.setLayoutType(View.LAYOUT_TYPE.FRAME);
        expect(nativeView._translatesAutoresizingMaskIntoConstraints).toEqual(true);
      });
    });
  });
});
