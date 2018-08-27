import Account from './model';
import { listQueryWithCount } from '../db/query';

export const get = async (req, res) => {
  const account = await Account.findById(req.params.id);
  res.json({ account });
};

const searchColumns = [Account.tableAttributes.address];

export const list = async (req, res) => {
  const { data, pagination } = await listQueryWithCount(Account, req.query, searchColumns);
  res.json({ accounts: data, pagination });
};
