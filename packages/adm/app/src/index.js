/* eslint-env node */

if (process.env.NODE_ENV === 'development') {
  require('./main/main-dev');
} else {
  require('./main/main-prod');
}
