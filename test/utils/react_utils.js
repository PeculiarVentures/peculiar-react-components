const PropTypes = require('prop-types');
const theme = require('./theme');

global.defaultComponentContext = {
  theme,
};

global.defaultComponentContextTypes = {
  theme: PropTypes.object,
};

global.defaultComponentOptions = {
  context: global.defaultComponentContext,
};

Object.freeze(global.defaultComponentContext);
Object.freeze(global.defaultComponentContextTypes);
Object.freeze(global.defaultComponentOptions);