
// const config = require('./config');
// const proxyReqHandler = require('./proxy-req-handler');
// const passport = require('passport');
// const oidcStrategy = require('./oidcStrategy');
// const requireAuth = require('./requireAuth');


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

// app.get('/config', requireAuth, (req, res) => {
//   res.send(config.frontend);
// });

// app.get('/config-full', requireAuth, (req, res) => {
//   res.send(config);
// });

// app.all(
//   '/api-proxy/*',
//   requireAuth,
//   proxyReqHandler(config.host, config.apiKey)
// );

