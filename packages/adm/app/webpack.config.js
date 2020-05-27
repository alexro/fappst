/* eslint-env node */
const { root, mode, prod_mode } = require('@clich/webpack-bnp').env(process.env.APP_PATH);
const { sourcemap_dev, sourcemap_prod } = require('@clich/webpack-bnp').sourceMaps;
const entryConfig = require('./config/webpack/entry');
const outputConfig = require('./config/webpack/output');
const rulesConfig = require('./config/webpack/rules');
const pluginsConfig = require('./config/webpack/plugins');
const aliasesConfig = require('./config/webpack/aliases');

const config = {
  mode,
  context: root,
  entry: entryConfig(prod_mode, root),
  output: outputConfig(prod_mode, root),
  devtool: prod_mode ? sourcemap_prod : sourcemap_dev,
  module: {
    rules: rulesConfig(prod_mode, root),
  },
  plugins: pluginsConfig(prod_mode, root),
  stats: 'minimal',
  resolve: {
    alias: aliasesConfig(),
  },
};

module.exports = config;
