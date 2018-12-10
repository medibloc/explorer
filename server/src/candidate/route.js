import { Router } from 'express';

import { get, list } from './controller';
import wrap from '../utils/controller';

export default Router()
  .get('/', wrap(list))
  .get('/:id', wrap(get));
