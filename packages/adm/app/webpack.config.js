/* eslint-env node */
const { resolve } = require('path');
const { root, mode, prod_mode } = require('@clich/webpack-bnp').env(__dirname);
const { js, scss } = require('@clich/webpack-bnp').rules;
const { sourcemap_dev, sourcemap_prod } = require('@clich/webpack-bnp').sourceMaps;
const { copyPlugin, htmlPlugin, hotReloadPlugins, define, provide } = require('@clich/webpack-bnp').plugins;

const config = {
  mode,
  context: root,
  entry: () => {
    if (prod_mode) {
      return {
        index: ['./src/index.js'],
      };
    } else {
      return {
        index: [
          'webpack-hot-middleware/client',
          // "react-hot-loader/patch",
          './src/index.js',
        ],
      };
    }
  },
  output: {
    path: resolve(root, 'build'), // Folder to store generated bundle
    filename: '[name].bundle.js', // Name of generated bundle after build
    publicPath: '/', // public URL of the output directory when referenced in a browser
  },
  devtool: prod_mode ? sourcemap_prod : sourcemap_dev,
  module: {
    rules: [js, scss],
  },
  plugins: [
    define({
      APP_ENV: JSON.stringify(mode),
      APP_HASH: JSON.stringify(process.env.APP_HASH),
    }),
    provide({
      GLOBAL: resolve(root, 'config/GLOBAL.js'),
    }),
    copyPlugin({
      patterns: [
        // { from: 'public/assets', to: 'assets' },
        // { from: 'public/images', to: 'images' },
        { from: 'public/favicon.ico', to: '.' },
      ],
    }),
    htmlPlugin({
      template: resolve(root, 'public/index.ejs'),
      filename: 'index.html',
      inject: false,
      templateParameters(compilation, assets, options) {
        return {
          compilation: compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: options,
          },
          APP_HASH: process.env.APP_HASH,
        };
      },
    }),
    ...(prod_mode ? [] : hotReloadPlugins()),
  ],
  stats: 'minimal',
  resolve: {
    alias: {
      // react: 'preact/compat',
      // 'react-dom/test-utils': 'preact/test-utils',
      // 'react-dom': 'preact/compat',
      // Must be below test-utils
    },
  },
};

module.exports = config;
