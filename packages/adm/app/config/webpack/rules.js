/* eslint-env node */
module.exports = (prod_mode, root) => {
  const { js, scss } = require('@clich/webpack-bnp').rules(prod_mode, root);

  return [js, scss];
};
