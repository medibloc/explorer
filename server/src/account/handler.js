import BigNumber from 'bignumber.js';
import Account from './model';
import db from '../db';
import logger from '../logger';
import Block from '../block/model';
import { requestAccount } from '../utils/requester';
import { parseAccount } from '../utils/parser';

const getAccountFromDB = (address, t) => Account
  .findOrCreate({ where: { address }, transaction: t })
  .then(accounts => accounts[0]);

export const updateTxToAccounts = async (rawTx, t, revert = false) => {
  const { from, to, value: valueStr } = rawTx;
  const value = new BigNumber(revert ? `-${valueStr}` : valueStr);
  const fromAccount = await getAccountFromDB(from, t);
  const toAccount = await getAccountFromDB(to, t);

  return Promise.all([
    fromAccount.update({
      totalTxs: fromAccount.totalTxs + (revert ? -1 : 1),
      balance: new BigNumber(fromAccount.balance).minus(value).toString(),
    }, { transaction: t }),
    toAccount.update({
      totalTxs: toAccount.totalTxs + (revert ? -1 : 1),
      balance: new BigNumber(toAccount.balance).plus(value).toString(),
    }, { transaction: t }),
  ])
    .catch(() => logger.error(`failed to update tx to accounts ${rawTx.hash}`));
};

export const updateCoinbaseAccount = async (rawBlock, t, revert = false) => {
  const { coinbase, reward: rewardStr } = rawBlock;
  const reward = new BigNumber(revert ? `-${rewardStr}` : rewardStr);
  const coinbaseAccount = await getAccountFromDB(coinbase, t);

  return coinbaseAccount.update({
    balance: new BigNumber(coinbaseAccount.balance).plus(reward).toString(),
  }, { transaction: t })
    .catch(() => logger.error(`failed to update coinbase account ${coinbaseAccount.address}`));
};

export const updateAllAccountsDataAfterSync = async () => (
  db.transaction(async (t) => {
    const accounts = await Account.findAll({ transaction: t });
    const { height } = await Block.findOne({ order: [['id', 'desc']], transaction: t });

    const promises = accounts.map(async (account) => {
      const acc = await requestAccount({ address: account.address, height });
      const parsedAccount = parseAccount(acc);

      return account.update(parsedAccount, { where: { id: account.id }, transaction: t })
        .catch(() => logger.error(`failed to update account ${acc.address}`));
    });
    await Promise.all(promises);
  })
);
