const webpack = require('webpack');

const copyPlugin = (options) => {
  const CopyPlugin = require('copy-webpack-plugin');
  return new CopyPlugin(options);
};

const htmlPlugin = (options) => {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  return new HtmlWebpackPlugin(options);
};

const hotReloadPlugins = () => [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

const prodPlugins = () => {
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  return [new UglifyJSPlugin()];
};

const define = (options) => new webpack.DefinePlugin(options);
const provide = (options) => new webpack.ProvidePlugin(options);

module.exports = {
  copyPlugin,
  htmlPlugin,
  hotReloadPlugins,
  define,
  provide,
};
