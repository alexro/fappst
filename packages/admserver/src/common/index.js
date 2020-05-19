const consts = require('../utils/consts')();

const path = require('path');
const resolve = require('path').resolve;
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const cors = require('cors');

const whitelist = [
  /^.*localhost:[0-9]{4,5}$/, //
  /^.*login.microsoftonline.com$/,
];

const corsOptions = {
  origin: (origin, callback) => {
    let match = false;
    if (!origin || origin === 'null') {
      match = true; // browser
    } else {
      // checking for match in whitelist
      for (let i = 0; i < whitelist.length; i += 1) {
        if (origin.match(whitelist[i])) {
          match = true;
          break;
        }
      }
    }

    if (match) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS - ${origin}`));
    }
  },
};

function config(app) {
  app.all('*', cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      name: 'session',
      secret: 'secu1t33AppXXisN0wS4f3akjhf1',
      maxAge: 0,
      secure: false,
      httpOnly: true, //cookie only accessible to http requests, and javascript
      ephemeral: true, //deletes cookie on closing browser
    })
  );

  app.get(
    '*',
    /*requireAuth,*/
    express.static(resolve(consts.APP_PATH, 'static')) //TODO: config
  );
}

module.exports = config;
