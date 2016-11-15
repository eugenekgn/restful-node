'use strict';

/**
 * could be used later to stub out 3rd party api/endpoints
 */

//import proxyquire  from 'proxyquire';


class IntegrationHooks {

  constructor() {
    this.server = undefined;
  }

  before() {
    throw new Error('not implemented');
  }

  after() {
    throw new Error('not implemented');
  }
}

export default new IntegrationHooks();
