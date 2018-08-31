import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import path from 'path';

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

  app.use('/image', express.static('build/image'))

  app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/manifest.json'));
  });

  app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/robots.txt'));
  });

  app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/service-worker.js'));
  });

  app.get('/asset-manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/asset-manifest.json'));
  });

  app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/favicon.ico'));
  });

  app.get('/static/css/main.*.css', (req, res) => {
    const glob = require('glob-fs')({ gitignore: false });
    const cssFiles = glob.readdirSync('build/static/css/main.*.css');
    res.set('Cache-Control', 'no-cache');
    return res.sendFile(path.join(__dirname, '../', cssFiles[0]));
  });

  app.get('/static/css/main.*.css.map', (req, res) => {
    const glob = require('glob-fs')({ gitignore: false });
    const mapFiles = glob.readdirSync('build/static/css/main.*.css.map');
    res.set('Cache-Control', 'no-cache');
    return res.sendFile(path.join(__dirname, '../', mapFiles[0]));
  });

  app.get('main.*.js', (req, res) => {
    const glob = require('glob-fs')({ gitignore: false });
    const jsFiles = glob.readdirSync('build/static/js/*.js');
    res.set('Cache-Control', 'no-cache');
    return res.sendFile(path.join(__dirname, '../', jsFiles[0]));
  });

  app.get('/static/js/main.*.js', (req, res) => {
    const glob = require('glob-fs')({ gitignore: false });
    const jsFiles = glob.readdirSync('build/static/js/*.js');
    res.set('Cache-Control', 'no-cache');
    console.log(jsFiles)
    return res.sendFile(path.join(__dirname, '../', jsFiles[0]));
  });

  app.get('/static/js/main.*.js.map', (req, res) => {
    const glob = require('glob-fs')({ gitignore: false });
    const mapFiles = glob.readdirSync('build/static/js/main.*.js.map');
    res.set('Cache-Control', 'no-cache');
    return res.sendFile(path.join(__dirname, '../', mapFiles[0]));
  });

  app.get(/.*/, (req, res) => {
    res.set('Cache-Control', 'no-cache');
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

  app.use(express.static('build'));
  app.use(errorHandler);
  return app;
};
