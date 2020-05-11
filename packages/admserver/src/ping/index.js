function config(app) {
  app.get('/ping', (req, res) => {
    res.statusCode = 200;
    res.send('pong');
  });

  app.get('/version', (req, res) => {
    res.json({
      version: 1,
    });
  });
}

module.exports = config;
