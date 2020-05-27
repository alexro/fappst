/* eslint-env node */
module.exports = (prod_mode/*, root*/) => {
  if (prod_mode) {
    return {
      index: ['./src/index.js'],
      login: ['./src/login.js'],
    };
  } else {
    return {
      index: [
        'webpack-hot-middleware/client',
        // "react-hot-loader/patch",
        './src/index.js',
      ],
      login: ['./src/login.js'],
    };
  }
};
