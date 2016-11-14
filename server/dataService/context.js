'use strict';

import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import config from 'config';
import logger from '../shared/logger';

class DbContext {

  connect(connectionString) {
    const uri = connectionString || config.get('database.connectionString');
    return new Promise((resolve, reject) => {
      mongoose.Promise = Bluebird;
      mongoose.connect(uri, (error) => {
        if (error) {
          logger.error(`Database connection error ${error}`);
          return reject(error);
        }
        resolve();
      });
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      mongoose.disconnect(() => {
        resolve();
      });
    });
  }
}
export default new DbContext();
