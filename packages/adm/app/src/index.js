const { resolve } = require('path');
require('@babel/register')({
  root: resolve(__dirname, '../config'),
  ignore: [/node_modules/],
});

const log = () => {
  console.log('lolo');
};

log();
