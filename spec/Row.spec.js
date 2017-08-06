describe('Row', function() {
  const Row = require('../opale_translate.sketchplugin/Contents/Sketch/Row');
  const Button = require('../opale_translate.sketchplugin/Contents/Sketch/Button');
  const { VisualConstraint, RelativeConstraint } = require('./helpers/mock/NSLayoutConstraint');

  beforeEach(() => {
    NSView.reset();
    NSButton.reset();
  });

  describe ('constructor', () => {
    it('sets the properties of the native text field', () => {
      const left = new Button('Gro');
      const right = new Button('Yoh');
      const row = new Row(left, right);
      const nativeView = row.nativeView;

      const expectedConstraint1 = new VisualConstraint({ format: 'H:|-0-[left]-[right]->=0-|', views: { left: left.nativeView, right: right.nativeView } });
      const expectedConstraint2 = new VisualConstraint({ format: 'V:|->=0-[left]->=0-|', views: { left: left.nativeView } });
      const expectedConstraint3 = new VisualConstraint({ format: 'V:|->=0-[right]->=0-|', views: { right: right.nativeView } });
      const expectedConstraint4 = new RelativeConstraint({ item: right.nativeView, toItem: left.nativeView, attribute: NSLayoutAttributeCenterY, toAttribute: NSLayoutAttributeCenterY, constant: 1 });
      expectedConstraint4.setActive(true);
      const expectedConstraint5 = new RelativeConstraint({ item: right.nativeView, toItem: null, attribute: NSLayoutAttributeHeight, toAttribute: NSLayoutAttributeHeight, relatedBy: NSLayoutRelationGreaterThanOrEqual, constant: 24 });
      expectedConstraint5.setActive(true);

      expect(right.nativeView._constraints).toEqual([expectedConstraint4, expectedConstraint5]);
      expect(nativeView._subViews).toEqual([left.nativeView, right.nativeView]);
      expect(nativeView._constraints).toEqual([expectedConstraint1, expectedConstraint2, expectedConstraint3]);
    });
  });

  describe ('alignWith', () => {
    it('aligns with the given row', () => {
      const left1 = new Button('Gro');
      const right1 = new Button('Yoh');
      const row1 = new Row(left1, right1);

      const left2 = new Button('Yoh');
      const right2 = new Button('gro');
      const row2 = new Row(left2, right2);

      row1.alignWith(row2);

      const expectedConstraint1 = new RelativeConstraint({ item: left1.nativeView, toItem: left2.nativeView });
      expectedConstraint1.setActive(true);
      const expectedConstraint2 = new RelativeConstraint({ item: right1.nativeView, toItem: right2.nativeView });
      expectedConstraint2.setActive(true);
      expect(left1.nativeView._constraints).toContain(expectedConstraint1);
      expect(right1.nativeView._constraints).toContain(expectedConstraint2);
    });
  });
});
