const path = require('path');
const componentsTheme = require('@pv/components-theme').default;

componentsTheme.create({
  inputDir: path.join(__dirname, '../src/styles'),
  outputDir: path.join(__dirname, '../css'),
  outputStyle: 'compressed',
});
