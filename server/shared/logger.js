'use strict';

const fs = require('fs');
const path = require('path');
const winston = require('winston');
const config = require('config');
const DailyRotateFileTransport = require('winston-daily-rotate-file');

const appDir = process.cwd();
const logsDir = path.join(appDir, config.get('logger.filesPath'));
const configTransports = config.get('logger.transports');
const transports = [];

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

if (configTransports.indexOf('console') !== -1) {
  const appConsoleTransport = new (winston.transports.Console)({
    timestamp: true
  });

  transports.push(appConsoleTransport);
}

if (configTransports.indexOf('dailyRotateFile') !== -1) {
  const appFileTransport = new (DailyRotateFileTransport)({
    filename: path.join(appDir, config.get('logger.appLogFilePath')),
    datePattern: '.yyyy-MM-dd'
  });

  transports.push(appFileTransport);
}

const appLogger = new (winston.Logger)({
  transports: transports
});

module.exports = {
  info: (message) => {
    appLogger.info(message);
  },
  error: (message) => {
    appLogger.error(message);
  }
};
