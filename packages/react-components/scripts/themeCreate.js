const path = require('path');
const uiTheme = require('@peculiar/ui-theming').default;

uiTheme.create(
  path.join(__dirname, '../css'),
  'default',
);
