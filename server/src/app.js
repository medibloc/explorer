import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';

import route from './route';

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

export default () => {
  const app = express();

  app.use(compression());
  app.use(bodyParser.json());
  app.use('/api', route);
  app.use(errorHandler);
  return app;
};
