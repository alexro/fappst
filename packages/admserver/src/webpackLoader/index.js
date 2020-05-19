const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
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
    webpackDevMiddleware(compiler, {
      reload: true,
      publicPath: webpackConfig.output.publicPath,
      stats: webpackConfig.stats,
    })
  );
  app.use(webpackHotMiddleware(compiler));

  app.get(
    '*',
    /*requireAuth,*/ (req, res, next) => {
      const filename = path.resolve(compiler.outputPath, `.${req.path}`);
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
          console.log(err)
          return next(err);
        }
        // res.set('content-type', 'text/html');
        res.contentType(filename);
        res.send(result);
        res.end();
      });
    }
  );
}

module.exports = config;
