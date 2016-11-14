'use strict';

/**
 * could be used later to stub out 3rd party api/endpoints
 */

//import proxyquire  from 'proxyquire';

import config from 'config';
import dbContext from '../../dataService/context';
import dbHelper from '../database';
import createApp from '../../app';

class IntegrationHooks {

  constructor() {
    this.server = undefined;
  }

  before() {
    const self = this;

    return new Promise((resolve) => {
      const app = createApp();
      const port = config.get('server.port');
      self.server = app.listen(port, () => {
        dbHelper.clearAllCollections().then(() => {
          resolve(app);
        });
      });
    });
  }

  after() {
    const self = this;

    return new Promise(() => {
      dbHelper.clearAllCollections().then(() => {
        self.server.close();
        dbContext.disconnect();
      });
    });
  }
}

export default new IntegrationHooks();
