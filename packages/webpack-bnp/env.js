/* eslint-env node */
const { statSync } = require('fs');
const { resolve } = require('path');

function file_exists(path) {
  try {
    const stats = statSync(path);
    return !!stats;
  } catch (_) {
    /* ignore */
  }
}

function load_dotenv(path) {
  try {
    require('dotenv').config({ path: path });
  } catch (_) {
    console.log(`Failed to require('dotenv')`);
  }
}

module.exports = (root) => {
  const path1 = resolve(root, '.env');
  const path1_exists = file_exists(path1);

  const path2 = resolve(root, 'config/.env');
  const path2_exists = file_exists(path2);

  if (path1_exists) {
    console.log(`Found .env at ${path1}`);
    load_dotenv(path1);
  } else if (path2_exists) {
    console.log(`Found .env at ${path2}`);
    load_dotenv(path2);
  } else {
    console.log('Found NO .env');
  }

  return {
    root,
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    prod_mode: process.env.NODE_ENV === 'production',
  };
};
