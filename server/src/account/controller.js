import { BadRequest } from 'http-errors';

import Account from './model';
import { listQueryWithCount } from '../db/query';

export const get = async (req, res) => {
  const { id } = req.params;
  let account;
  if (+id) {
    account = await Account.findById(req.params.id);
  }
  if (!account) {
    account = await Account.findOne({ where: { address: id } });
  }
  // TODO use accountLogs
  if (!account) {
    throw new BadRequest('account not found');
  }

  res.json({ account });
};

const searchColumns = [Account.tableAttributes.address];

export const list = async (req, res) => {
  const options = { ...req.query, order: [['balance', 'DESC'], ['id', 'DESC']] };
  const { data, pagination } = await listQueryWithCount(Account, options, searchColumns);
  res.json({ accounts: data, pagination });
};
