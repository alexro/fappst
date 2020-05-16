/* eslint-env node */
const { resolve } = require('path');
const root = resolve(__dirname, '..');

require('dotenv').config({ path: resolve(__dirname, '.env') });

const { babelJS, scss } = require('./webpack-bnp').rules;
const { sourceMapDev, sourceMapProd } = require('./webpack-bnp').sourceMaps;
const { definePlugin, htmlPlugin, hotReloadPlugins } = require('./webpack-bnp').plugins;

const config = {
  mode: 'development',
  // context: root,
  entry: [
    'webpack-hot-middleware/client',
    // "react-hot-loader/patch",
    resolve(root, 'src/index.js'),
  ],
  output: {
    path: resolve(root, 'dist'), // Folder to store generated bundle
    filename: 'bundle.js', // Name of generated bundle after build
    publicPath: '/', // public URL of the output directory when referenced in a browser
  },
  devtool: sourceMapDev(),
  module: {
    rules: [babelJS(), scss()],
  },
  plugins: [
    definePlugin({ API_KEY: process.env.API_KEY }),
    htmlPlugin(resolve(root, 'public/index.html')),
    ...hotReloadPlugins(),
  ],
};

module.exports = config;
