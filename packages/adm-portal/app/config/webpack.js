/* eslint-env node */
const { resolve } = require('path');
const root = resolve(__dirname, '..');

require('dotenv').config({ path: resolve(__dirname, '.env') });

const { babelJS, eslintJS, scss } = require('@clich/webpack-bnp').rules;
const { sourceMapDev, sourceMapProd } = require('@clich/webpack-bnp').sourceMaps;
const { copyPlugin, definePlugin, htmlPlugin, hotReloadPlugins } = require('@clich/webpack-bnp').plugins;

const config = {
  mode: 'development',
  context: root,
  entry: [
    'webpack-hot-middleware/client',
    // "react-hot-loader/patch",
    resolve(root, 'src/index.js'),
  ],
  output: {
    path: resolve(root, 'build'), // Folder to store generated bundle
    filename: 'bundle.js', // Name of generated bundle after build
    publicPath: '/', // public URL of the output directory when referenced in a browser
  },
  devtool: sourceMapDev(),
  module: {
    rules: [babelJS(), scss()],
  },
  plugins: [
    definePlugin({ API_KEY: process.env.API_KEY }),
    copyPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' },
        { from: 'public/images', to: 'images' },
        { from: 'public/favicon.ico', to: '.' },
        { from: 'public/index-demo.html', to: '.' },
      ],
    }),
    htmlPlugin({ template: resolve(root, 'public/index.html'), inject: false }),
    ...hotReloadPlugins(),
  ],
  stats: 'minimal',
};

module.exports = config;
