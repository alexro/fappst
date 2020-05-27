/* eslint-env node */
const { resolve } = require('path');
const { copyPlugin, htmlPlugin, hotReloadPlugins, define, provide } = require('@clich/webpack-bnp').plugins;

module.exports = (prod_mode, root) => [
  define({
    APP_ENV: JSON.stringify(prod_mode ? 'production' : 'development'),
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
  htmlPlugin({
    template: resolve(root, 'public/login.ejs'),
    filename: 'login.html',
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
];
