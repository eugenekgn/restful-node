'use strict';

import bodyParser from 'body-parser';

import heartbeatController from '../web/controllers/heartbeat.controller';
import customerController from '../web/controllers/customer.controller';
import cors from 'cors';

export default(app) => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());

  app.use('/api', heartbeatController.registerRoutes());
  app.use('/api/customers', customerController.registerRoutes());
};
