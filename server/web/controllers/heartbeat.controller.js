'use strict';

import BaseController from './base';
import heartbeatService from '../../services/internal/heartbeat.service';

class HeartbeatController extends BaseController {

  registerRoutes() {
    const self = this;

    self.router.get('/health-check', self.wrap(self.service.getValidResponse));

    return self.router;
  }
}

export default new HeartbeatController(heartbeatService)
