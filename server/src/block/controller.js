import { NotFound } from 'http-errors';

import { listQueryWithCount } from '../db/query';
import Block from './model';

export const get = async (req, res) => {
  const { id } = req.params;
  let block;
  if (+id) {
    block = await Block.findById(id);
  } else {
    block = await Block.findOne({ where: { hash: id } });
  }
  if (!block) {
    throw new NotFound('block not exists');
  }
  res.json({ block });
};

const searchColumns = [Block.tableAttributes.hash];

export const list = async (req, res) => {
  const blocks = await listQueryWithCount(Block, req.query, searchColumns);
  res.json({ blocks });
};
