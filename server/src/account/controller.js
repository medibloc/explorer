import Account from './model';
import { listQuery } from '../db/query';

export const get = async (req, res) => {
  const account = await Account.findById(req.params.id);
  res.json({ account });
};

export const list = async (req, res) => {
  const accounts = await Account.findAll(listQuery(req.query));
  res.json({ accounts });
};
