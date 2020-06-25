const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const publicPath = '/';

module.exports = {
  mode: 'development',
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    path.resolve(__dirname, '../../src/index.jsx'),
  ],
  output: {
    pathinfo: true,
    path: path.join(__dirname, '../../dist'),
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[name].chunk.js',
    publicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.yaml'],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 20000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  resolveLoader: {
    alias: {
      'doc-loader': path.join(__dirname, '../utils/doc-loader/index.js'),
    },
  },
  module: {
    rules: [
      {
        test: /.*basic_.*\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.sass$/,
        exclude: /.*basic_.*\.sass$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg|gif)$/,
        use: ['url-loader?limit=100001'],
      },
      {
        test: /\.yaml$/,
        use: ['json-loader', 'yaml-loader'],
      },
      {
        test: /\.yaml2$/,
        use: ['yaml-loader'],
      },
      {
        test: /\.(js|jsx|jss)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: 'raw-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        use: [{
          loader: 'doc-loader',
          options: {
            examplesDirPath: './src/sources',
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../../../components/themes/default.css'),
        to: './assets/css',
      },
    ]),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
      }),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/index.ejs'),
      publicPath,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
};

