'use strict';

const express = require('express');
const bootstrap = require('./bootstrap');

module.exports = () => {

  const app = express();
  bootstrap(app);

  return app;
};

