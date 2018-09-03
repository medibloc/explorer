import { Router } from 'express';
import { NotFound } from 'http-errors';
import v1 from './v1';

export default Router()
  .use('/v1', v1)
  .use('*', (req, res, next) => {
    next(NotFound());
  });
