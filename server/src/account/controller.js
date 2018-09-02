import { BadRequest } from 'http-errors';
import { keyBy } from 'lodash';
import { Op } from 'sequelize';

import Account from './model';
import Transaction from '../transaction/model';
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

  const { data: { txs_from: txsFrom, txs_to: txsTo } } = account;
  const dbTxs = await Transaction
    .findAll({ where: { txHash: { [Op.in]: [...txsFrom, ...txsTo] } } });
  const dbTxsMap = keyBy(dbTxs, 'txHash');
  txsFrom.forEach((tx, i) => {
    txsFrom[i] = dbTxsMap[tx].dataValues;
  });
  txsTo.forEach((tx, i) => {
    txsTo[i] = dbTxsMap[tx].dataValues;
  });

  res.json({
    account: {
      ...account.dataValues,
      data: {
        ...account.data,
        txs_from: txsFrom,
        txs_to: txsTo,
      },
    },
  });
};

const searchColumns = [Account.tableAttributes.address];

export const list = async (req, res) => {
  const options = { ...req.query, order: [['balance', 'DESC'], ['id', 'DESC']] };
  const { data, pagination } = await listQueryWithCount(Account, options, searchColumns);
  res.json({ accounts: data, pagination });
};
