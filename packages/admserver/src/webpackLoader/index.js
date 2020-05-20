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
      const isHtml = req.path.indexOf('.') < 0 || req.path.indexOf('index.html') > 0;
      const filename = path.resolve(compiler.outputPath, isHtml ? 'index.html' : `.${req.path}`);
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        console.log(filename);
        if (err) {
          console.log(err);
          return next(err);
        }
        res.contentType(filename);
        res.send(result);
        res.end();
      });
    }
  );
}

module.exports = config;
