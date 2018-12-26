/* eslint "import/no-extraneous-dependencies": 1 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const getCommitHash = require('../utils/get_commit_hash');
const getClientEnvironment = require('../utils/env');

const env = getClientEnvironment();
const publicPath = '/';

module.exports = {
  mode: 'development',
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    path.resolve(__dirname, `../../${env.raw.ENTRY_FOLDER}/${env.raw.ENTRY_FILE}`),
  ],
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    path: path.resolve(__dirname, `../../${env.raw.OUTPUT_FOLDER}`),
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'assets/js/[name].[hash].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'assets/js/[name].[hash].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    symlinks: false,
    modules: [path.resolve('node_modules')],
  },
  resolveLoader: {
    alias: {
      'doc-loader': path.join(__dirname, '../utils/doc-loader/index.js'),
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 30000,
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
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
              useCache: true,
              forceIsolatedModules: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-react-loader',
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              importLoaders: 1,
              namedExport: true,
              camelCase: true,
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
        exclude: /bundler/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              importLoaders: 1,
              namedExport: true,
              camelCase: true,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.yaml$/,
        use: ['json-loader', 'yaml-loader'],
      },
      {
        test: /\.(png|jp?g)$/,
        use: ['url-loader'],
      },
      {
        test: /\.md?$/,
        use: [{
          loader: 'doc-loader',
          options: {
            examplesDirPath: './src/docs',
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // Copies individual files or entire directories to the build directory.
    // https://www.npmjs.com/package/copy-webpack-plugin
    new CopyWebpackPlugin([
      // Copies htmls from package containers
      {
        from: path.resolve(__dirname, `../../${env.raw.ENTRY_FOLDER}/containers/**/*.html`),
        to: './parts/[0]',
        test: /([^/]+)\/([a-z]+)\.html$/,
      },
      {
        from: path.join(__dirname, '../../node_modules/lib-react-components/lib/themes/default.css'),
        to: './assets/css',
      },
    ]),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }..
    new webpack.DefinePlugin({
      'process.env': env.stringified,
    }),
    // This plugin will cause hashes to be based on the relative path of
    // the module, generating a four character string as the module id.
    // Suggested for use in production.
    // https://webpack.js.org/plugins/hashed-module-ids-plugin/
    new webpack.HashedModuleIdsPlugin(),
    // Generates an `index.html` file with the <script> injected.
    // https://www.npmjs.com/package/html-webpack-plugin
    new HtmlWebpackPlugin({
      // Now you can use env variables in html.
      // For example `<%= htmlWebpackPlugin.options.PORT %>`.
      ...env.raw,
      // Disable service-worker for development mode
      USE_SERVICE_WORKER: '',
      ENDPOINTS: require(`../../${env.raw.ENTRY_FOLDER}/endpoints_config.json`), // eslint-disable-line
      title: env.raw.TITLE,
      template: path.resolve(__dirname, `../../${env.raw.ENTRY_FOLDER}/${env.raw.ENTRY_HTML_FILE}`),
      publicPath,
    }),
    // Enhances html-webpack-plugin functionality with different deployment
    // options for your scripts including
    // https://www.npmjs.com/package/script-ext-html-webpack-plugin
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Generate json with unique string (commit/uuid)
    // https://www.npmjs.com/package/generate-json-webpack-plugin
    new GenerateJsonPlugin('build_info.json', {
      buildInfo: getCommitHash(),
    }),
    // As the loader generates typing files, it is wise to tell
    // webpack to ignore them. The fix is luckily very simple.
    // Webpack ships with a "WatchIgnorePlugin" out of the box.
    new webpack.WatchIgnorePlugin([
      /sass\.d\.ts$/,
      /css\.d\.ts$/,
    ]),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
};
