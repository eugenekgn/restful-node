'use strict';

const configControllers = require('./configControllers');

module.exports = (app) => {
  configControllers(app);
};
