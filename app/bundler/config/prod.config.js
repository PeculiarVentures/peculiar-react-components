/* eslint "import/no-extraneous-dependencies": 1 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const getCommitHash = require('../utils/get_commit_hash');
const getClientEnvironment = require('../utils/env');

const env = getClientEnvironment();
const plugins = [];
let publicPath = env.raw.PUBLIC_PATH || '/';

if (publicPath.slice(-1) !== '/') {
  publicPath = `${publicPath}/`;
}

if (env.raw.ANALYZE_BUNDLE === 'true') {
  // Visualize size of webpack output files with an interactive zoomable treemap.
  // https://www.npmjs.com/package/webpack-bundle-analyzer
  plugins.push(new BundleAnalyzerPlugin());
}

if (env.raw.USE_SERVICE_WORKER === 'true') {
  // Generate a service worker script that will precache, and keep up to date,
  // the HTML & assets that are part of the Webpack build.
  // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
  plugins.push(new WorkboxWebpackPlugin.GenerateSW({
    swDest: 'sw.js',
    cacheId: 'app',
    clientsClaim: true,
    skipWaiting: true,
    exclude: [
      /\.map$/,
      /asset-manifest\.json$/,
      /info\.json$/,
    ],
    importWorkboxFrom: 'cdn',
    navigateFallback: `${publicPath}index.html`,
    navigateFallbackBlacklist: [
      // Exclude URLs starting with /_, as they're likely an API call
      new RegExp('^/_'),
      // Exclude URLs containing a dot, as they're likely a resource in
      // public/ and not a SPA route
      new RegExp('/[^/]+\\.[^/]+$'),
    ],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
        handler: 'cacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 5,
            maxAgeSeconds: 600,
          },
        },
      },
    ],
  }));
}

module.exports = {
  mode: 'production',
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: env.raw.USE_SOURCE_MAP === 'true' ? 'source-map' : false,
  entry: path.resolve(__dirname, `../../${env.raw.ENTRY_FOLDER}/${env.raw.ENTRY_FILE}`),
  output: {
    // The build folder.
    path: path.resolve(__dirname, `../../${env.raw.OUTPUT_FOLDER}`),
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'assets/js/[name].[contenthash:8].js',
    chunkFilename: 'assets/js/[name].[contenthash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    symlinks: false,
    modules: [path.resolve('node_modules')],
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
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: false,
      }),
    ],
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
            loader: MiniCssExtractPlugin.loader,
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
            loader: MiniCssExtractPlugin.loader,
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
    // if (process.env.NODE_ENV === 'production') { ... }.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
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
      ENDPOINTS: require(`../../${env.raw.ENTRY_FOLDER}/endpoints_config.json`), // eslint-disable-line
      title: env.raw.TITLE,
      template: path.resolve(__dirname, `../../${env.raw.ENTRY_FOLDER}/${env.raw.ENTRY_HTML_FILE}`),
      publicPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new HtmlWebpackPlugin({
      // Now you can use env variables in html.
      // For example `<%= htmlWebpackPlugin.options.PORT %>`.
      ...env.raw,
      ENDPOINTS: require(`../../${env.raw.ENTRY_FOLDER}/endpoints_config.json`), // eslint-disable-line
      title: env.raw.TITLE,
      template: path.resolve(__dirname, `../../${env.raw.ENTRY_FOLDER}/${env.raw.ENTRY_HTML_FILE}`),
      publicPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      filename: '404.html',
    }),
    // Enhances html-webpack-plugin functionality with different deployment
    // options for your scripts including
    // https://www.npmjs.com/package/script-ext-html-webpack-plugin
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // This plugin extracts CSS into separate files.
    // It creates a CSS file per JS file which contains CSS.
    // https://www.npmjs.com/package/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
    // Allows to use the favicons generator with webpack
    // https://github.com/donskov/favicons-webpack-plugin
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, `../../${env.raw.ENTRY_FOLDER}/assets/favicon.png`),
      appName: env.raw.TITLE,
      start_url: publicPath,
      path: publicPath,
      persistentCache: false,
      orientation: 'portrait',
    }),
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
    ...plugins,
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
