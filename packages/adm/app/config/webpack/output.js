/* eslint-env node */
const { resolve } = require('path');

module.exports = (prod_mode, root) => ({
  path: resolve(root, 'build'), // Folder to store generated bundle
  filename: '[name].bundle.js', // Name of generated bundle after build
  publicPath: '/', // public URL of the output directory when referenced in a browser
});
