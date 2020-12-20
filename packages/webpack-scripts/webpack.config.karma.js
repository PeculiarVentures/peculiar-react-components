require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  bail: true,
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: 'source-map-loader',
      // },
      {
        test: /\.(tsx?|jsx)$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'post',
        test: /src\/.*\.tsx?$/,
        loader: 'istanbul-instrumenter-loader',
        options: {
          esModules: true,
        },
        exclude: /node_modules|\.(spec|stories)\.tsx?$/,
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
  ],
};
