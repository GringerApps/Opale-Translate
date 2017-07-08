const Iterator = require("./Iterator");
const { I18nGoParser, ExcelParser } = require("./Parsers");
const AlertWindow = require("./AlertWindow");
const FilePickerButton = require("./FilePickerButton")
const Delegator = require("./Delegator");
const Window = require("./Window");
const DropdownButton = require("./DropdownButton");
const { scaleFrame } = require("./viewhelper");
const { TITLE, MESSAGES } = require("./consts");
const ALERT = new AlertWindow(TITLE);

const verifySelection = (context) => {
  const api = context.api();
  const selectedLayers = api.selectedDocument.selectedLayers;
  const selection = new Iterator(selectedLayers);

  if (selection.count() == 0) {
    ALERT.show(MESSAGES.EMPTY_SELECTION);
    return false;
  }

  const artboards = selection.filter((layer) => layer.isArtboard);

  if (artboards.count() != selection.count()) {
    ALERT.show(MESSAGES.WRONG_SELECTION);
    return false;
  }

  return true;
};

const OPTIONS = {
  APPLY_TO: {
    SELECTED_ARTBOARDS: 0
  },
  ADD_ARTBOARD_TO: {
    THE_RIGHT: 0
  },
  CASE_MATCHING: {
    SENSITIVE: 0
  }
};

const BTN_CLICKED = {
  TRANSLATE: 1000,
  CANCEL: 1001
};

const buildView = (context, state) => {
  const api = context.api();
  const window = new Window();
  window.setMessageText("Opale");
  window.setInformativeText("Duplicates your artboards and replaces the text in them using the text in a spreadsheet file (.xls, .xlsx or .ods)");

  const fileSelectButton = new FilePickerButton("Select a spreadsheet");
  fileSelectButton.onFileSelected((files) => {
    const result = {};
    if (files.length < 1) {
      return result;
    }
    const filename = String(files[0]).split('\\').pop().split('/').pop();
    fileSelectButton.setLabel('Spreadsheet: ' + filename);
    for (let i = 0; i < files.length; i++) {
      const fullpath = files[i];

      const content = NSString.alloc().initWithContentsOfFile_encoding_error_(fullpath, encoding, null);
      const filename = fullpath.split('\\').pop().split('/').pop().replace(/\.[^/.]+$/, "");
      result[filename] = content;
      state.content = result;
    }
  });

  fileSelectButton.addToWindow(window);

  const preview = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 480, 180));
  const gridUrl = api.resourceNamed("grid.png");
  const gridSuffixUrl = api.resourceNamed("grid_suffix.png");
  const gridImage = NSImage.alloc().initWithContentsOfURL(gridUrl);
  const gridSuffixImage = NSImage.alloc().initWithContentsOfURL(gridSuffixUrl);
  const imgView = NSImageView.alloc().init();
  imgView.setImage(gridImage);
  imgView.setImageAlignment(2);
  imgView.setImageScaling(0);
  imgView.setTranslatesAutoresizingMaskIntoConstraints(false);

  const NSButtonDelegator = new Delegator({
    callback: () => {
      imgView.setImage(checkBox.state() == NSOnState ? gridSuffixImage : gridImage);
      state.firstRowForSuffix = checkBox.state() == NSOnState;
    }
  });
  const delegator = NSButtonDelegator.getClassInstance();
  const checkBox = NSButton.alloc().init();
  checkBox.setTarget(delegator);
  checkBox.setAction("callback");
  checkBox.setTitle("Use first row for\nartboard suffixes");
  checkBox.setButtonType(NSSwitchButton);
  checkBox.setTranslatesAutoresizingMaskIntoConstraints(false);

  const previewSubviews = {
    img: imgView,
    checkBox
  };
  preview.addSubview(imgView);
  preview.addSubview(checkBox);
  const previewHConstraints = NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views_("H:|-0-[img(348)]-[checkBox]->=0-|", 0, null, previewSubviews);
  const previewVImgConstraints = NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views_("V:|-0-[img(180)]->=0-|", 0, null, previewSubviews);
  const previewVCheckBoxConstraints = NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views_("V:|-7-[checkBox]->=0-|", 0, null, previewSubviews);
  preview.addConstraints(previewHConstraints);
  preview.addConstraints(previewVCheckBoxConstraints);
  preview.addConstraints(previewVImgConstraints);

  window.addAccessoryView(preview);

  new DropdownButton()
    .setLabel("Apply to:", DropdownButton.ALIGNMENT.HORIZONTAL, DropdownButton.TEXT_ALIGNMENT.RIGHT)
    .addItems(["Selected artboards"])
    .onSelectionChanged((idx) => { state.applyTo = idx })
    .addToWindow(window);

  new DropdownButton()
    .setLabel("New artboards to the:", DropdownButton.ALIGNMENT.HORIZONTAL, DropdownButton.TEXT_ALIGNMENT.RIGHT)
    .addItems(["Right"])
    .onSelectionChanged(() => { state.addNewArtboardTo = OPTIONS.ADD_ARTBOARD_TO.THE_RIGHT })
    .addToWindow(window);

  new DropdownButton()
    .setLabel("Case matching:", DropdownButton.ALIGNMENT.HORIZONTAL, DropdownButton.TEXT_ALIGNMENT.RIGHT)
    .addItems(["Case sensitive"])
    .onSelectionChanged(() => { state.caseMatching = OPTIONS.CASE_MATCHING.SENSITIVE })
    .addToWindow(window);

  window.addButtonWithTitle("Replace text");
  window.addButtonWithTitle("Cancel");

  const btns = window.buttons();
  const replaceBtn = btns[0];
  const ReplaceButtonDelegator = new Delegator({
    callback: () => {
      if(verifySelection(context)) {
        const selectedLayers = api.selectedDocument.selectedLayers;
        const selection = new Iterator(selectedLayers);
        const artboards = selection.filter((layer) => layer.isArtboard);
        const parser = new ExcelParser(state.firstRowForSuffix);
        const translatedContent = parser.parse(state.content);
        artboards.forEach((layer) => {
          const frame = layer.frame;
          for (const key in translatedContent) {
            const translations = translatedContent[key];
            const duplicatedLayer = layer.duplicate();
            frame.offset(frame.width + 20, 0);
            duplicatedLayer.frame = frame;
            duplicatedLayer.name = duplicatedLayer.name + "-" + key;
            const iterator = new Iterator([duplicatedLayer]);
            const texts = iterator.filter((layer) => layer.isText, true);
            texts.forEach((layer) => {
              const text = String(layer.text);
              const translation = translations[text] || text;
              layer.text = translation;
            });
          }
        });
      }
    }
  });
  const replaceDelegator = ReplaceButtonDelegator.getClassInstance();
  replaceBtn.setTarget(replaceDelegator);
  replaceBtn.setAction("callback");
  replaceBtn.setHighlighted(true);

  const CancelButtonDelegator = new Delegator({
    callback: () => {
      window.close();
    }
  });
  const cancelDelegator = CancelButtonDelegator.getClassInstance();
  const cancelBtn = btns[1];
  cancelBtn.setTarget(cancelDelegator);
  cancelBtn.setAction("callback");
  cancelBtn.setHighlighted(false);

  return window;
};

translate = (context) => {
  const state = {
    applyTo: OPTIONS.APPLY_TO.SELECTED_ARTBOARDS,
    addNewArtboardTo: OPTIONS.ADD_ARTBOARD_TO.THE_RIGHT,
    caseMatching: OPTIONS.CASE_MATCHING.SENSITIVE,
    firstRowForSuffix: false,
    content: {}
  };

  const window = buildView(context, state);
  window.runModal();
};
