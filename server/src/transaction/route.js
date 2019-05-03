import { Router } from 'express';

import wrap from '../utils/controller';
import auth from '../route/auth';

import { get, list, blind } from './controller';

export default Router()
  .get('/', wrap(list))
  .get('/:id', wrap(get))
  .patch('/:id', wrap(auth), wrap(blind));
