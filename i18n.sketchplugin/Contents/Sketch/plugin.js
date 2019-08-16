const Iterator = require('./Iterator');
const { ExcelParser } = require('./Parsers');
const AlertWindow = require('./AlertWindow');
const FilePickerButton = require('./FilePickerButton');
const Delegator = require('./Delegator');
const Window = require('./Window');
const { TITLE, MESSAGES } = require('./consts');
const View = require('./View');
// const TextField = require('./TextField');
// const Row = require('./Row');
// const ImageView = require('./ImageView');
// const Checkbox = require('./Checkbox');
const Button = require('./Button');

const ALERT = new AlertWindow(TITLE);

const verifySelection = (api) => {
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

const translateTexts = (api, state, window) => {
  if(verifySelection(api)) {
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
        duplicatedLayer.name = duplicatedLayer.name + '-' + key;
        const iterator = new Iterator([duplicatedLayer]);
        const texts = iterator.filter((layer) => layer.isText, true);
        texts.forEach((layer) => {
          const text = String(layer.text);
          const translation = translations[text] || text;
          layer.text = translation;
        });
      }
    });
    window.close();
  }
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
  window.setMessageText('Opale');
  window.setInformativeText('Duplicates your artboards and replaces the text in them using the text in a spreadsheet file (.xls, .xlsx or .ods)');

  const fileSelectButton = new FilePickerButton('Select a spreadsheet');
  fileSelectButton.setFrame(NSMakeRect(0, 0, 400, 30));
  fileSelectButton.setLayoutType(View.LAYOUT_TYPE.FRAME);
  fileSelectButton.onFileSelected((files) => {
    const result = {};
    if (files.length < 1) {
      return result;
    }
    const filename = String(files[0]).split('\\').pop().split('/').pop();
    fileSelectButton.setLabel('Spreadsheet: ' + filename);
    for (let i = 0; i < files.length; i++) {
      const fullpath = files[i];

      const content = NSString.alloc().initWithContentsOfFile_encoding_error_(fullpath, NSISOLatin1StringEncoding, null);
      const filename = fullpath.split('\\').pop().split('/').pop().replace(/\.[^/.]+$/, '');
      result[filename] = content;
      state.content = result;
    }
  });

  window.addAccessoryView(fileSelectButton.nativeView);

  // const preview = new View();
  // preview.setFrame(NSMakeRect(0, 0, 480, 180));

  // const imgView = new ImageView(context);
  // imgView.setImageFromResource("grid_suffix.png");

  // const checkBox = new Checkbox("Use first row for\nartboard suffixes");
  // checkBox.onSelectionChanged((checked) => {
  //   const resource = checked ? "grid_suffix.png" : "grid.png";
  //   imgView.setImageFromResource(resource);
  //   state.firstRowForSuffix = checked;
  // });

  // const previewSubviews = { imgView, checkBox };
  // preview.addSubview(imgView);
  // preview.addSubview(checkBox);
  // preview.addVisualConstraint("H:|-0-[imgView(348)]-[checkBox]->=0-|", previewSubviews);
  // preview.addVisualConstraint("V:|-0-[imgView(180)]->=0-|", previewSubviews);
  // preview.addVisualConstraint("V:|-7-[checkBox]->=0-|", previewSubviews);

  // window.addAccessoryView(preview.nativeView);

  // const applyToLabel = new TextField("Apply to:", TextField.TEXT_ALIGNMENT.RIGHT);
  // const applyToDropdown = new DropdownButton()
  //   .addItems(["Selected artboards"])
  //   .onSelectionChanged((idx) => { state.applyTo = idx });
  // const applyToRow = new Row(applyToLabel, applyToDropdown);

  // const artboardPositionLabel = new TextField("New artboards to the:", TextField.TEXT_ALIGNMENT.RIGHT);
  // const artboardPositionDropdown = new DropdownButton()
  //                                    .addItems(["Right"])
  //                                    .onSelectionChanged(() => { state.addNewArtboardTo = OPTIONS.ADD_ARTBOARD_TO.THE_RIGHT })
  // const artboardRow = new Row(artboardPositionLabel, artboardPositionDropdown);

  // const caseLabel = new TextField("Case matching:", TextField.TEXT_ALIGNMENT.RIGHT);
  // const caseDropdown = new DropdownButton()
  //   .addItems(["Case sensitive"])
  //   .onSelectionChanged(() => { state.caseMatching = OPTIONS.CASE_MATCHING.SENSITIVE })
  // const caseRow = new Row(caseLabel, caseDropdown);

  // const dropdownsView = new View();
  // dropdownsView.setFrame(NSMakeRect(0, 0, 400, 50));
  // dropdownsView.addSubview(applyToRow);
  // dropdownsView.addSubview(artboardRow);
  // dropdownsView.addSubview(caseRow);
  // dropdownsView.addVisualConstraint("V:|-[applyTo]-[artboards]-[case]|", { applyTo: applyToRow, artboards: artboardRow, case: caseRow });
  // artboardRow.alignWith(applyToRow);
  // caseRow.alignWith(applyToRow);

  // window.addAccessoryView(dropdownsView.nativeView);

  window.addButtonWithTitle('Replace text');
  window.addButtonWithTitle('Cancel');

  const btns = window.buttons();
  const replaceBtn = btns[0];
  const ReplaceButtonDelegator = new Delegator({ callback: () => translateTexts(api, state, window) });
  const replaceDelegator = ReplaceButtonDelegator.getClassInstance();
  replaceBtn.setTarget(replaceDelegator);
  replaceBtn.setAction('callback');
  replaceBtn.setHighlighted(true);

  const CancelButtonDelegator = new Delegator({ callback: () => window.close() });
  const cancelDelegator = CancelButtonDelegator.getClassInstance();
  const cancelBtn = btns[1];
  cancelBtn.setTarget(cancelDelegator);
  cancelBtn.setAction('callback');
  cancelBtn.setHighlighted(false);

  const btn = new Button('test');
  btns.push(btn);

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
