import config from '../config';

import app from './app';
import initBlockChain from './blockchain/init';

const { PORT } = config.SERVER;

const run = () => initBlockChain()
  .then(() => {
    console.log('sync blockchain completed'); // eslint-disable-line no-console
    app().listen(PORT, () => {
      console.log(`Listening on ${PORT}`); // eslint-disable-line no-console
    });
  });

run();
