/* eslint-env node */
const sourcemap_dev = 'cheap-module-eval-source-map';
const sourcemap_prod = 'source-map';

module.exports = {
  env: require('./env'),
  rules: require('./rules'),
  sourceMaps: { sourcemap_dev, sourcemap_prod },
  plugins: require('./plugins'),
};
