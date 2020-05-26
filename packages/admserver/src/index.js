const consts = require('./utils/consts')({
  APP_PATH: process.env.APP_PATH,
  logPath: process.env.LOG_PATH,
});

const path = require('path');
const resolve = require('path').resolve;
const http = require('http');
const express = require('express');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// const morgan = require('morgan');
// const winston = require('./utils/logger');

// const config = require('./config');
// const passport = require('passport');
// const oidcStrategy = require('./oidcStrategy');

const app = express();

// app.use(morgan('combined', { stream: winston('morgan').stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

function authenticate(u, p, done) {
  console.log('auth');
  return done(null, { name: 'okay' });
}
function serializeUser() {
  console.log('ser');
}
function deserializeUser() {
  console.log('deser');
}

passport.use(new LocalStrategy(authenticate));
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);

app.get('/login', function (req, res) {
  console.log('get login')
  res.send('<form  method="post"><input name="username" /><input name="password" /><button type="submit" value="sub" /></form>');
});

app.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

// passport.use(oidcStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

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
require('./webpackLoader')(app, resolve(consts.APP_PATH, 'webpack.config.js'));

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
