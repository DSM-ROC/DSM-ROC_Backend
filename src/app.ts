import express, { Application } from 'express';

import config from './config';
import loadApp from './utils';

const startServer = async () => {
  const app: Application = express();

  await loadApp(app);
  app.listen(config.port);
};

startServer()
  .then(() => console.log(`Server Run on ${config.port}`))
  .catch(e => {
    console.error('Server Run Failed');
    console.error(e);
    process.exit(1);
  });
