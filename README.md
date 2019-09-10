# Opale-Translate
i18n plugin for Sketch. Enables you to translate your artboards using json or Excel xlsx files. 

It acts in a non-destructive way so you can easily undo your changes later.

## Installation
1. Download the repository via `Clone or download` button above
2. Grab the `	i18n.sketchplugin` folder from the ZIP.
3. In Sketch 3, select `Plugins > Reveal Plugins Folder...` from the menu bar, and put the `Sketch i18n` folder in this folder.

## Usage

1. See example Excel file in spec/fixtures/xslx/translations.xlsx
2. Use text in your textfields as translation key (not the name of the layer, but the actual text).
3. Make your own Excel file based on example above
4. Select Plugins > Translate Selection > Using xlsx format , select your translation file
