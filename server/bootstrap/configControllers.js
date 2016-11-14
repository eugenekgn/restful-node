'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const heartbeatController = require('../web/controllers/heartbeat.controller');
const customerController = require('../web/controllers/customer.controller');

module.exports = (app) => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());

  // disable headers
  app.disable('x-powered-by');

  app.use('/api', heartbeatController.registerRoutes());
  app.use('/api/customers', customerController.registerRoutes());

};
