import config from '../config';
import logger from './logger';

import app from './app';
import initBlockChain from './blockchain/init';

const { PORT } = config.SERVER;

const run = () => initBlockChain()
  .then(() => {
    logger.info('sync blockchain completed');
    app().listen(PORT, () => {
      logger.info(`Listening on ${PORT}`);
    });
  });

run();
