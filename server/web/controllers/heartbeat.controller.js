'use strict';

const BaseController = require('./base');
const heartbeatService = require('../../services/internal/heartbeat.service');

class HeartbeatController extends BaseController {

  registerRoutes() {

    const self = this;
    self.router.get('/health-check', self.wrap(self.service.getValidResponse));

    return self.router;
  }
}

module.exports = new HeartbeatController(heartbeatService);
