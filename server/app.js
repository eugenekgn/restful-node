import express from 'express';
import bootstrap from './bootstrap';
import dbContext from './dataService/context';

export default () => {
  dbContext.connect();

  const app = express();
  bootstrap(app);

  return app;
};

