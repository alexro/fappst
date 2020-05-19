const consts = require('./utils/consts')({
  APP_PATH: process.env.APP_PATH,
  logPath: process.env.LOG_PATH,
});

const path = require('path');
const resolve = require('path').resolve;
const http = require('http');
const express = require('express');

// const morgan = require('morgan');
// const winston = require('./utils/logger');

// const config = require('./config');
// const passport = require('passport');
// const oidcStrategy = require('./oidcStrategy');

const app = express();
// app.use(morgan('combined', { stream: winston('morgan').stream }));

// passport.use(oidcStrategy);
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

//https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/login', passport.authenticate('azuread-openidconnect'), function (
//   req,
//   res
// ) {
//   res.redirect('/');
// });

// app.get('/oauth2/callback', function (req, res) {
//   res.redirect('/');
// });

// app.post(
//   '/oauth2/callback',
//   passport.authenticate('azuread-openidconnect', {
//     failureRedirect: '/failure',
//   }),
//   function (req, res) {
//     res.redirect('/');
//   }
// );

// app.get('/failure', function (req, res) {
//   // TODO this will give a bad UI experience
//   res.send('Failed to log in. Please try again.');
// });

// app.get('/logout', function (req, res) {
//   req.logout();
//   // Do not want to redirect to root / as this will not kill Azure AAD session
//   res.redirect(config.destroySessionUrl);
// });

// require('./auth')(app);
require('./common')(app);
// require('./ping')(app);
require('./webpackLoader')(app, resolve(consts.APP_PATH, 'config/webpack.js'));

const server = http.createServer(app);

/* eslint-disable no-console */
server.listen(5001, (err) => {
  if (err) {
    console.log('Failed to start server');
    console.log(err);
  }
  console.log(`Server has started on port: ${server.address().port}`);
});
/* eslint-enable */

// module.exports = app;
