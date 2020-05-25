/* eslint-env node */

if (process.env.NODE_ENV === 'development') {
  require('./main-dev');
} else {
  require('./main-prod');
}
