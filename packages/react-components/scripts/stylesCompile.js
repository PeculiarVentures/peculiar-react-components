const path = require('path');
const uiTheme = require('@peculiar/ui-theme').default;

uiTheme.create({
  inputDir: path.join(__dirname, '../src/styles'),
  outputDir: path.join(__dirname, '../css'),
  outputStyle: 'expanded',
});
