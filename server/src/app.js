import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';

import config from '../config';
import route from './route';
import initBlockChain from './blockchain/init';

const { port } = config;

const sendError = (err, req, res) => {
  const code = err.status || 500;
  let { message } = err;
  if (code >= 500 && process.NODE_ENV === 'production') {
    message = 'Internal Server Error'; // hide error message on production
  }
  console.log(err.stack); // eslint-disable-line no-console

  res.status(code).send(message);
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return sendError(err, req, res);
};

initBlockChain().then(() => {
  console.log('sync blockchain complete'); // eslint-disable-line no-console

  const app = express();
  app.use(compression());
  app.use(bodyParser.json());
  app.use('/api', route);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Listening on ${port}`); // eslint-disable-line no-console
  });
});
