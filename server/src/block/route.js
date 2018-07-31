import { Router } from 'express';

import wrap from '../utils/controller';
import { get, list } from './controller';

export default Router()
  .get('/', wrap(list))
  .get('/:id', wrap(get));
