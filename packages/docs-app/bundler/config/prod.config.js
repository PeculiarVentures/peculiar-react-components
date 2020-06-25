const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CONFIG = require('../../env/production.json');

const publicPath = CONFIG.PUBLIC_PATH || '/';

module.exports = {
  mode: 'production',
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'cheap-source-map',
  entry: path.resolve(__dirname, '../../src/index.jsx'),
  output: {
    // The build folder.
    path: path.resolve(__dirname, '../../dist'),
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'assets/js/[name].[contenthash:8].js',
    chunkFilename: 'assets/js/[name].[contenthash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
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
    minimize: true,
    minimizer: [
      // This plugin for minify your JavaScript.
      // https://github.com/webpack-contrib/terser-webpack-plugin
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            // we want to preserve some comments in dist
            comments: /@preserve/i,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
      // This plugin for minify your CSS.
      // https://github.com/webpack-contrib/mini-css-extract-plugin
      new OptimizeCSSAssetsPlugin(),
    ],
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.sass$/,
        exclude: /.*basic_.*\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
            loader: MiniCssExtractPlugin.loader,
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
        NODE_ENV: 'production',
      }),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/index.ejs'),
      publicPath,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
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
