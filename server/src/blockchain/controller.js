import { BadRequest } from 'http-errors';
import { onSubscribe } from './handler';

export const subscribe = (req, res) => { // eslint-disable-line import/prefer-default-export
  const topics = (req.query.topics || '').split(',');
  if (!topics.length) {
    throw new BadRequest('topic is empty');
  }
  res.sseSetup();
  onSubscribe(req, res, { topics });
  return Promise.resolve();
};
