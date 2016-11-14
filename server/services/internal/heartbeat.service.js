'use strict';

const httpStatus = require('http-status');

class HeartbeatService {
  getValidResponse() {
    return Promise.resolve(httpStatus.OK);
  }
}

module.exports = new HeartbeatService();
