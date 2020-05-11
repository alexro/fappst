const path = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function config(app, configPath) {
  // if (process.env.NODE_ENV === 'production') {
  //   console.log('hira');
  //   app.get('*', requireAuth, (req, res) => {
  //     res.sendFile(path.resolve(__dirname, '..', 'app', 'build', 'index.html'));
  //   });
  // } else {
  const webpackConfig = require(configPath);
  const compiler = webpack(webpackConfig);

  app.use(
    middleware(compiler, {
      reload: true,
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(webpackHotMiddleware(compiler));

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

module.exports = config;
