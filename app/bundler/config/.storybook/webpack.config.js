const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const config = require('../dev.config');

/**
 * Ignore Plugins that are prohibited in with storybook
 */
function modifyPluginsList() {
  return config.plugins.filter(plugin => 
    !(plugin instanceof HtmlWebpackPlugin) &&
    !(plugin instanceof ScriptExtHtmlWebpackPlugin) &&
    !(plugin instanceof webpack.HotModuleReplacementPlugin));
}

module.exports = {
  resolve: config.resolve,
  module: config.module,
  plugins: modifyPluginsList(config.plugins),
};
