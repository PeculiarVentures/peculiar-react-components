# `lib-theme-constructor`

Theme constructor for [react components](https://www.npmjs.com/package/lib-react-components)

## Installation

```bash
npm install lib-theme-contructor --D
```

## Configure
```js
// index.js
const path = require('path');
const themeConstructor = require('lib-theme-contructor');

(async () => {
  await themeConstructor.createThemes([
    {
      name: 'theme-name',
      entry: path.join(__dirname, '../entry/path/to/index.sss'),
      out: path.join(__dirname, '../output/dir/name'),
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

## Run
```bash
node index.js
```

Now in your `../output/dir/name` you have `theme-name.css` file with new theme.

### Run test
```bash
npm run test
```