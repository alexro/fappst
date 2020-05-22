/* eslint-env node */
const { resolve } = require('path');
const root = resolve(__dirname, '..');

require('dotenv').config({ path: resolve(__dirname, '.env') });

const { babelJS, eslintJS, ejs, scss } = require('@clich/webpack-bnp').rules;
const { sourceMapDev, sourceMapProd } = require('@clich/webpack-bnp').sourceMaps;
const { copyPlugin, htmlPlugin, hotReloadPlugins, define, provide } = require('@clich/webpack-bnp').plugins;

const config = {
  mode: 'development',
  context: root,
  entry: {
    index_js: [
      'webpack-hot-middleware/client',
      // "react-hot-loader/patch",
      resolve(root, 'src/index.js'),
    ],
    // index_html: [resolve(root, 'public/index.ejs')],
  },
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
    define({ APP_HASH: JSON.stringify(process.env.APP_HASH) }),
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
    ...hotReloadPlugins(),
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
