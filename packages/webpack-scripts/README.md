# Webpack scripts

## Installation

```bash
npm install @peculiar/webpack-scripts --save-dev
```

## Usage (karma)

`karma.conf.js`
```js
const webpackConfig = require('@peculiar/webpack-scripts/webpack.config.karma');

module.exports = (config) => {
  config.set({
    files: [
      path.join(dirname, 'test/index.ts'),
    ],
    preprocessors: {
      [path.join(dirname, 'test/index.ts')]: ['webpack'],
    },
    webpack: webpackConfig,
  });
}
```