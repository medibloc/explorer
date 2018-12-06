import { NotFound } from 'http-errors';

import { listQueryWithCount } from '../db/query';
import Block from './model';
import Transaction from '../transaction/model';

export const get = async (req, res) => {
  const { id } = req.params;
  let block;
  if (+id) {
    block = await Block.findById(id);
  } else {
    block = await Block.findOne({ where: { hash: id } });
  }

  const txList = [];
  if (block.data.transactions.length === 0) {
    const txs = await Transaction.findAll({ where: { blockHeight: block.data.height } });
    txs.forEach(tx => txList.push(tx.dataValues.data));
  }

  if (!block) {
    throw new NotFound('block not exists');
  }
  block.data.transactions = txList;
  res.json({ block });
};

const searchColumns = [Block.tableAttributes.hash];

export const list = async (req, res) => {
  const blocks = await listQueryWithCount(Block, req.query, searchColumns);
  res.json({ blocks });
};
