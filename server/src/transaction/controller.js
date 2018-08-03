import { NotFound } from 'http-errors';

import Transaction from './model';

import { listQuery } from '../db/query';

export const get = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    throw new NotFound('transaction not exists');
  }
  res.json({ transaction });
};

const searchColumns = [Transaction.tableAttributes.txHash];

export const list = async (req, res) => {
  const transactions = await Transaction.findAll(listQuery(req.query, searchColumns));
  res.json({ transactions });
};
