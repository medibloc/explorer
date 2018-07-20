import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';

import config from './config';
import route from './route';

const { port } = config;

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(route);

app.listen(port, () => {
  console.log(`Listening on ${port}`); // eslint-disable-line no-console
});
