/* eslint "import/no-extraneous-dependencies": 1 */

const glob = require('glob');
const Path = require('path');
const webpack = require('webpack');

/**
 * This function generate definition files (.d.ts) for each .sass or .css file in project
 * It needs to be called before running the build/tests/etc because typescript caches that style
 * file has no definition.
 */
module.exports = () => new Promise((res, rej) => {
  const typingsOptions = {
    importLoaders: 1,
    namedExport: true,
    camelCase: true,
    modules: true,
    localIdentName: '[local]_[hash:base64:5]',
  };

  const entries = glob.sync(Path.join(__dirname, '../../src/**/*.sass'));

  if (entries.length) {
    webpack({
      mode: 'development',
      entry: entries,
      module: {
        rules: [
          {
            test: /\.sass$/,
            use: [
              {
                loader: 'typings-for-css-modules-loader',
                options: typingsOptions,
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
          {
            test: /\.css$/,
            exclude: /bundler/,
            use: [
              {
                loader: 'typings-for-css-modules-loader',
                options: typingsOptions,
              },
            ],
          },
        ],
      },
    }, err => (err ? rej(err) : res()));
  } else {
    res();
  }
});
