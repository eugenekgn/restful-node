import config from 'config';
import logger from './server/shared/logger';
import appModule from './server/app';

//import throng from 'throng';
// function start() {
//   const app = appModule();
//   const port = config.get('server.port');
//
//   console.log(app);
//   config.log(port);
//
//   app.listen(port, function () {
//     logger.info('Server listening on port ' + port);
//   });
// };
//
// const runOptions = {
//   lifetime: Infinity
// };
//
// if (!config.get('server.isMultithreaded')) {
//   runOptions.workers = 1;
// }

const app = appModule();
const port = config.get('server.port');

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

export default app;
