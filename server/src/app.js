import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import cors from 'cors';

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

// SSE stands for Server Sent Event
const sseMiddleware = (req, res, next) => {
  res.sseSetup = () => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
  };

  res.sseSend = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.flush();
  };

  next();
};

export default () => {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(cors());
  }
  app.use(compression());
  app.use(bodyParser.json());
  app.use(sseMiddleware);
  app.use('/api', route);
  app.use(errorHandler);
  return app;
};
