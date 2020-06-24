# `lib-theme-constructor`

This package contains a code for generate theme for the lib-react-components package.

## Installation

```bash
npm install --save-dev lib-theme-contructor
```

## Usage


### Prepare theme file

```js
// index.js
const path = require('path');
const themeConstructor = require('lib-theme-contructor');

(async () => {
  await themeConstructor.createThemes([
    {
      name: 'theme-name',
      entry: path.join(__dirname, './entry/path/to/index.sss'),
      out: path.join(__dirname, './output/dir/name'),
      options: {
        palette: {
          primary: '#3D7DFF',
          secondary: '#FFC200',
          black: '#222D47',
          dark_grey: '#5B647D',
          grey: '#CBCFD7',
          light_grey: '#F5F6FA',
          success: '#00D093',
          wrong: '#F12727',
          white: '#FFFFFF',
        },
        variables: {
          borderRadius: '3px',
          buttonSmallHeight: '24px',
          buttonMediumHeight: '30px',
          buttonLargeHeight: '40px',
          buttonSmallFontSize: '12px',
          buttonMediumFontSize: '13px',
          buttonLargeFontSize: '13px',
          inputMediumFontSize: '12px',
          inputLargeFontSize: '13px',
          inputMediumHeight: '30px',
          inputLargeHeight: '40px',
          textareaMediumHeight: '150px',
          textareaLargeHeight: '200px',
        },
      },
    },
  ]);
})();
```

### Run theme file

```bash
node index.js
```

Now in your `./output/dir/name` you have `theme-name.css` file with new CSS theme.