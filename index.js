const config = require('config');
const logger = require('./server/shared/logger');
const appModule = require('./server/app');

//const throng= require('throng';
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

module.exports = app;
