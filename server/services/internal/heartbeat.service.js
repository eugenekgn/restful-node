'use strict';

import httpStatus from 'http-status';

class HeartbeatService {
  getValidResponse() {
    return Promise.resolve(httpStatus.OK);
  }
}

export default new HeartbeatService();
