const winston = require('winston');
const { logPath } = require('../consts')();

const options = {
  morgan: {
    level: 'info',
    filename: `${logPath}/morgan.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  file: {
    level: 'info',
    filename: `${logPath}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

function config(token) {
  let transports;

  if (token.match(/morgan$/)) {
    transports = [
      new winston.transports.File(options.morgan), //
    ];
  } else if (token.match(/.js$/)) {
    transports = [
      new winston.transports.File(options.file), //
      new winston.transports.Console(options.console),
    ];
  } else {
    transports = [];
  }

  const logger = winston.createLogger({
    transports,
    exitOnError: false,
  });

  logger.stream = {
    write: function (message) {
      logger.info(message);
    },
  };

  return logger;
}

module.exports = function (token) {
  return config(token);
};
