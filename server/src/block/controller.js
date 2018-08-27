import { NotFound } from 'http-errors';

import { listQueryWithCount } from '../db/query';
import Block from './model';

export const get = async (req, res) => {
  const { id } = req.params;
  const block = await Block.findById(id);
  if (!block) {
    throw new NotFound('block not exists');
  }
  res.json({ block });
};

export const list = async (req, res) => {
  const blocks = await listQueryWithCount(Block, req.query);
  res.json({ blocks });
};
