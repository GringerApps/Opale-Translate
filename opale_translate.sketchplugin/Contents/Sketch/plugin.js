const Iterator = require('./Iterator');
const { ExcelParser } = require('./Parsers');
const AlertWindow = require('./AlertWindow');
const FilePickerButton = require('./FilePickerButton');
const Delegator = require('./Delegator');
const Window = require('./Window');
const { TITLE, MESSAGES } = require('./consts');
const View = require('./View');
const TextField = require('./TextField');
const DropdownButton = require('./DropdownButton');
const Row = require('./Row');
const ImageView = require('./ImageView');
const Checkbox = require('./Checkbox');
const Button = require('./Button');
const Box = require('./Box');

const ALERT = new AlertWindow(TITLE);

const OPTIONS = {
  APPLY_TO: {
    SELECTED_ARTBOARDS: 0,
    CURRENT_PAGE: 1
  },
  ADD_ARTBOARD_TO: {
    THE_RIGHT: 0,
    THE_BOTTOM: 1
  },
  CASE_MATCHING: {
    SENSITIVE: 0,
    INSENSITIVE: 1
  },
  CASE_REPLACEMENT: {
    NONE: 0,
    SMART: 1
  }
};

translate = (context) => {
  new TextReplacer(context).run();
};

class LayerMover {
  constructor(iterator) {
    const frames = iterator.map((layer) => layer.frame);
    const xmin = Math.min.apply(null, frames.map((frame) => frame.x));
    const ymin = Math.min.apply(null, frames.map((frame) => frame.y));
    const xmax = Math.max.apply(null, frames.map((frame) => frame.x + frame.width));
    const ymax = Math.max.apply(null, frames.map((frame) => frame.y + frame.height));
    this.original_width = this.width = xmax - xmin + 100;
    this.original_height = this.height = ymax - ymin + 100;
  }

  next() {
    this.width += this.original_width;
    this.height += this.original_height;
  }

  moveToBottom(layer) {
    const frame = layer.frame;
    frame.offset(0, this.height);
    layer.frame = frame;
  }

  moveToRight(layer) {
    const frame = layer.frame;
    frame.offset(this.width, 0);
    layer.frame = frame;
  }
}

const DEFAULT_SETTINGS = {
  applyTo: OPTIONS.APPLY_TO.SELECTED_ARTBOARDS,
  addNewArtboardTo: OPTIONS.ADD_ARTBOARD_TO.THE_RIGHT,
  caseMatching: OPTIONS.CASE_MATCHING.SENSITIVE,
  caseReplacement: OPTIONS.CASE_REPLACEMENT.NONE,
  firstRowForSuffix: true,
  filename: null
};
const SETTING_KEY = 'com.opale.translate.settings';
class Setting {
  constructor(api) {
    this.api = api;
    this.state = Object.assign(DEFAULT_SETTINGS, this._load());
  }

  get(key) {
    const value = this.state[key];
    if (value === undefined) {
      return null;
    }
    return value;
  }

  set(key, value) {
    this.state[key] = value;
  }

  save() {
    this.api.setSettingForKey(SETTING_KEY, JSON.stringify(this.state));
  }

  _load() {
    try {
      return JSON.parse(this.api.settingForKey(SETTING_KEY));
    } catch(_) {
      return {};
    }
  }
}

class CaseReplacer {
  constructor(input) {
    this.input = input;
  }

  apply(str) {
    if(this._isLowerCase()) {
      return str.toLowerCase();
    }
    if(this._isUpperCase()) {
      return str.toUpperCase();
    }
    if(this._isTitleCase()) {
      return str.split(' ').map((s) => s.substring(0, 1).toUpperCase() + s.substring(1)).join(' ');
    }
    if(this._isSentenceCase()) {
      return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }
    return str;
  }

  _isUpperCase() {
    return this.input == this.input.toUpperCase();
  }

  _isLowerCase() {
    return this.input == this.input.toLowerCase();
  }

  _isSentenceCase() {
    const firstChar = this.input.substring(0, 1);
    const restOfSentence = this.input.substring(1);
    return firstChar == firstChar.toUpperCase() && restOfSentence == restOfSentence.toLowerCase();
  }

  _isTitleCase() {
    const words = this.input.split(' ');
    return words.length > 1 && words.every((str) => str.length == 0 || str[0] == str[0].toUpperCase());
  }
}

class TextReplacer {
  constructor(context) {
    this.context = context;
    this.settings = new Setting(context.api());
    this.parser = new ExcelParser(this.settings.get('firstRowForSuffix'));
    this.content = {};
    this.window = new Window();
  }

  _translateTexts() {
    if(this._verifySelection()) {
      const api = this.context.api();
      const selectedLayers = this.settings.get('applyTo') === OPTIONS.APPLY_TO.CURRENT_PAGE ? api.selectedDocument.selectedPage : api.selectedDocument.selectedLayers;
      const selection = new Iterator(selectedLayers);
      const artboards = selection.filter((layer) => layer.isArtboard, this.settings.get('applyTo') === OPTIONS.APPLY_TO.CURRENT_PAGE);
      const mover = new LayerMover(artboards);
      const translatedContent = this.parser.parse();
      for (const key in translatedContent) {
        artboards.forEach((layer) => {
          const translations = JSON.parse(JSON.stringify(translatedContent[key]));
          const duplicatedLayer = layer.duplicate();
          if(this.settings.get('addNewArtboardTo') === OPTIONS.ADD_ARTBOARD_TO.THE_RIGHT){
            mover.moveToRight(duplicatedLayer);
          } else {
            mover.moveToBottom(duplicatedLayer);
          }
          duplicatedLayer.name = duplicatedLayer.name + '-' + key;
          const iterator = new Iterator([duplicatedLayer]);
          const texts = iterator.filter((layer) => layer.isText, true);
          const isCaseSensitive = this.settings.get('caseMatching') == OPTIONS.CASE_MATCHING.SENSITIVE;
          if(!isCaseSensitive) {
            Object.keys(translations).map(function(key) {
              translations[key.toLowerCase()] = translations[key];
            });
          }
          texts.forEach((layer) => {
            const text = String(layer.text);
            const matchingText = isCaseSensitive ? text : text.toLowerCase();
            if(translations.hasOwnProperty(matchingText)) {
              const translation = translations[matchingText];
              if(this.settings.get('caseReplacement') == OPTIONS.CASE_REPLACEMENT.SMART) {
                const replacer = new CaseReplacer(text);
                layer.text = replacer.apply(translation);
              } else {
                layer.text = translation;
              }
            }
          });
        });
        mover.next();
      }
      this.settings.save();
      this.window.close();
    }
  }

  _buildView() {
    const replacer = this;
    const context = this.context;
    const window = this.window;
    const settings = this.settings;

    window.setMessageText('Opale Translate');
    window.setInformativeText('Duplicates your artboards and replaces the text in them using the text in a spreadsheet file (.xls, .xlsx or .ods)');
    window.addButtonWithTitle('Replace text');
    window.addButtonWithTitle('Cancel');

    const btns = window.buttons();
    const replaceBtn = btns[0];
    const ReplaceButtonDelegator = new Delegator({ callback: () => replacer._translateTexts() });
    const replaceDelegator = ReplaceButtonDelegator.getClassInstance();
    replaceBtn.setTarget(replaceDelegator);
    replaceBtn.setAction('callback');
    replaceBtn.setEnabled(false);
    replaceBtn.setHighlighted(true);

    const CancelButtonDelegator = new Delegator({ callback: () => window.close() });
    const cancelDelegator = CancelButtonDelegator.getClassInstance();
    const cancelBtn = btns[1];
    cancelBtn.setTarget(cancelDelegator);
    cancelBtn.setAction('callback');
    cancelBtn.setHighlighted(false);

    const fileSelectButton = new FilePickerButton('Select a spreadsheet');
    fileSelectButton.setFrame(NSMakeRect(0, 0, 400, 25));
    fileSelectButton.setLayoutType(View.LAYOUT_TYPE.FRAME);
    fileSelectButton.onFileSelected((files) => {
      if (files.length < 1) {
        return;
      }
      const fullpath = files[0];
      if (!fullpath.endsWith('.xls') && !fullpath.endsWith('.xlsx') && !fullpath.endsWith('.ods')) {
        replaceBtn.setEnabled(false);
        fileSelectButton.setFiles([]);
        box.setText('The selected file is not in a supported format (.xls, .xlsx or .ods).');
        box.setHidden(false);
        return;
      }
      const content = NSString.alloc().initWithContentsOfFile_encoding_error_(fullpath, NSISOLatin1StringEncoding, null);
      if (content === null) {
        replaceBtn.setEnabled(false);
        fileSelectButton.setFiles([]);
        return;
      }
      let filename = fullpath.split('/').pop();
      if (filename.length > 30) {
        filename = filename.substring(0, 10) + '...' + filename.substring(filename.length - 10);
      }
      try {
        this.parser.setContent(content);
        fileSelectButton.setLabel('Spreadsheet: ' + filename);
        replaceBtn.setEnabled(true);
        settings.set('filename', fullpath);
        box.setText('');
        box.setHidden(true);
      } catch(e) {
        replaceBtn.setEnabled(false);
        fileSelectButton.setFiles([]);
        box.setText('The selected file is not in a supported format (.xls, .xlsx or .ods).');
        box.setHidden(false);
      }
    });

    window.addAccessoryView(fileSelectButton.nativeView);

    const box = new Box(context);
    box.setFrame(NSMakeRect(0, 0, 480, 26));
    box.setHidden(true);
    window.addAccessoryView(box.nativeView);

    const preview = new View();
    preview.setFrame(NSMakeRect(0, 0, 480, 180));

    const imgView = new ImageView(context);
    imgView.setImageFromResource('grid_suffix.png');

    const checkBox = new Checkbox('Use first row for\nartboard suffixes', this.settings.get('firstRowForSuffix'));
    checkBox.onSelectionChanged((checked) => {
      const resource = checked ? 'grid_suffix.png' : 'grid.png';
      imgView.setImageFromResource(resource);
      settings.set('firstRowForSuffix', checked);
    });

    const previewSubviews = { imgView, checkBox };
    preview.addSubview(imgView);
    preview.addSubview(checkBox);
    preview.addVisualConstraint('H:|-0-[imgView(348)]-[checkBox]->=0-|', previewSubviews);
    preview.addVisualConstraint('V:|-0-[imgView(180)]->=0-|', previewSubviews);
    preview.addVisualConstraint('V:|-7-[checkBox]->=0-|', previewSubviews);

    window.addAccessoryView(preview.nativeView);

    const applyToLabel = new TextField('Apply to:', TextField.TEXT_ALIGNMENT.RIGHT);
    const applyToDropdown = new DropdownButton()
      .addItems(['Selected artboards', 'Current page'])
      .setSelectedAt(this.settings.get('applyTo'))
      .onSelectionChanged((idx) => { settings.set('applyTo', idx); });
    const applyToRow = new Row(applyToLabel, applyToDropdown);

    const artboardPositionLabel = new TextField('New artboards to the:', TextField.TEXT_ALIGNMENT.RIGHT);
    const artboardPositionDropdown = new DropdownButton()
      .addItems(['Right', 'Bottom'])
      .setSelectedAt(this.settings.get('addNewArtboardTo'))
      .onSelectionChanged((idx) => { settings.set('addNewArtboardTo', idx); });
    const artboardRow = new Row(artboardPositionLabel, artboardPositionDropdown);

    const caseLabel = new TextField('Case matching:', TextField.TEXT_ALIGNMENT.RIGHT);
    const caseDropdown = new DropdownButton()
      .addItems(['Case sensitive', 'Case insensitive'])
      .setSelectedAt(this.settings.get('caseMatching'))
      .onSelectionChanged((idx) => { settings.set('caseMatching', idx); });
    const caseRow = new Row(caseLabel, caseDropdown);

    const caseReplacementLabel = new TextField('Case replacement:', TextField.TEXT_ALIGNMENT.RIGHT);
    const caseReplacementDropdown = new DropdownButton()
      .addItems(['Standard', 'Smart'])
      .setSelectedAt(this.settings.get('caseReplacement'))
      .onSelectionChanged((idx) => { settings.set('caseReplacement', idx); });
    const caseReplacementRow = new Row(caseReplacementLabel, caseReplacementDropdown);

    const dropdownsView = new View();
    dropdownsView.setFrame(NSMakeRect(0, 0, 480, 100));
    dropdownsView.addSubview(applyToRow);
    dropdownsView.addSubview(artboardRow);
    dropdownsView.addSubview(caseRow);
    dropdownsView.addSubview(caseReplacementRow);
    dropdownsView.addVisualConstraint('V:|-[applyTo]-5-[artboards]-5-[case]-5-[caseReplacement]|', {
      applyTo: applyToRow,
      artboards: artboardRow,
      case: caseRow,
      caseReplacement: caseReplacementRow
    });
    artboardRow.alignWith(applyToRow);
    caseRow.alignWith(applyToRow);
    caseReplacementRow.alignWith(applyToRow);

    window.addAccessoryView(dropdownsView.nativeView);

    const btn = new Button('test');
    btns.push(btn);

    const filename = settings.get('filename');
    if(filename !== null){
      const fileManager = NSFileManager.defaultManager();
      if(fileManager.fileExistsAtPath(filename)) {
        fileSelectButton.setFiles([filename]);
      }
    }
  }

  _verifySelection() {
    const api = this.context.api();
    const selectedDocument = api.selectedDocument;

    if(this.settings.get('applyTo') === OPTIONS.APPLY_TO.CURRENT_PAGE) {
      return true;
    }
    const selectedLayers = selectedDocument.selectedLayers;
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
  }

  run() {
    this._buildView();
    this.window.runModal();
  }
}
