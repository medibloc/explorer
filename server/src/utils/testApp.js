import 'babel-polyfill';
import supertest from 'supertest';

import app from '../app';
import { close } from '../db';

if (process.env.NODE_ENV !== 'test') {
  console.log('NODE_ENV must be "test"'); // eslint-disable-line no-console
  process.exit(1);
}

after(close);

export default supertest(app());
