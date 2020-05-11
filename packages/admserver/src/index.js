const path = require('path');
const http = require('http');

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const APP_PATH = process.env.APP_PATH;
console.log(APP_PATH);
const webpackConfig = require(path.join(APP_PATH, 'webpack.config.js'));
const compiler = webpack(webpackConfig);

const express = require('express');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const session = require('express-session');


// const config = require('./config');
// const corsOptions = require('./cors-options');
// const proxyReqHandler = require('./proxy-req-handler');
// const passport = require('passport');
// const version = require('./version');
// const oidcStrategy = require('./oidcStrategy');
// const requireAuth = require('./requireAuth');

const app = express();

// passport.use(oidcStrategy);
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

// app.all('*', cors(corsOptions));

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(
//   session({
//     name: 'session',
//     secret: 'secu1t33AppXXisN0wS4f3akjhf1',
//     maxAge: 0,
//     secure: false,
//     httpOnly: true, //cookie only accessible to http requests, and javascript
//     ephemeral: true, //deletes cookie on closing browser
//   })
// );
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

// app.get('/config', requireAuth, (req, res) => {
//   res.send(config.frontend);
// });

// app.get('/config-full', requireAuth, (req, res) => {
//   res.send(config);
// });

// app.get('/ping', requireAuth, (req, res) => {
//   res.statusCode = 200;
//   res.send('pong');
// });

// app.get('/version', requireAuth, (req, res) => {
//   res.json({
//     version,
//   });
// });

// app.all(
//   '/api-proxy/*',
//   requireAuth,
//   proxyReqHandler(config.host, config.apiKey)
// );

// app.get(
//   '*',
//   requireAuth,
//   express.static(path.join(__dirname, '..', 'app', 'build'))
// );

if (process.env.NODE_ENV === 'production') {
  app.get('*', requireAuth, (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'app', 'build', 'index.html'));
  });
} else {
  app.use(
    middleware(compiler, {
      reload: true,
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(webpackHotMiddleware(compiler));

  // This is how we get Express to serve the generated index.html for
  // requests that fall through to this handler.
  app.get(
    '*',
    /*requireAuth,*/ (req, res, next) => {
      const filename = path.resolve(compiler.outputPath, 'index.html');
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
          return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
      });
    }
  );
}

/* eslint-disable no-console */
server.listen(5001, (err) => {
  if (err) {
    console.log('Failed to start server');
    console.log(err);
  }
  console.log(`Server has started on port: ${server.address().port}`);
});
/* eslint-enable */
