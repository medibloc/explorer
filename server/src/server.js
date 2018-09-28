import config from '../config';

import app from './app';
import initBlockChain from './blockchain/init';

const { port } = config;

const run = () => initBlockChain()
  .then(() => {
    console.log('sync blockchain completed'); // eslint-disable-line no-console
    app().listen(port, () => {
      console.log(`Listening on ${port}`); // eslint-disable-line no-console
    });
  });

run();
