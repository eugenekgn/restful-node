import mongoose from 'mongoose';
import util from 'util';
import config from 'config';
import app from './server/app';

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

const dbConnectionString = config.get('database.connectionString');


// connect to mongo db
mongoose.connect(dbConnectionString, {server: {socketOptions: {keepAlive: 1}}});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${dbConnectionString}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}


if (!module.parent) {
  let port = config.get('server.port');
  let environment = config.get('server.environment');
  app.listen(port, () => {
    debug(`server started on port ${port} (${environment})`);
  });
}

export default app;
