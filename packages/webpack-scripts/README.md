# Webpack scripts

## Usage (karma)

`karma.conf.js`
```js
const { webpackConfigKarma } = require('@peculiar/webpack-scripts');

module.exports = (config) => {
  config.set({
    files: [
      path.join(dirname, 'test/index.ts'),
    ],
    preprocessors: {
      [path.join(dirname, 'test/index.ts')]: ['webpack'],
    },
    webpack: webpackConfigKarma,
  });
}
```
