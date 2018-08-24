import axios from 'axios';
import BigNumber from 'bignumber.js';

import config from '../../config';

import db from '../db';

import Account from '../account/model';
import AccountLog from '../accountLog/model';
import Block from '../block/model';
import Transaction from '../transaction/model';

const { url } = config.blockchain;

const REQUEST_STEP = 100;
const UPDATE_PERIOD = 5000; // 5 sec

const parseBlock = block => ({
  data: block,
  height: +block.height,
  id: +block.height,
});

const parseTx = (block, tx) => ({
  blockId: block.id,
  data: tx,
  txHash: tx.hash,
});

const accountUpdater = (t) => {
  const accountMap = {};
  const getAccount = (address) => {
    if (accountMap[address]) {
      return Promise.resolve(accountMap[address]);
    }
    return Account.findOrCreate({ transaction: t, where: { address } })
      .then(([account]) => {
        accountMap[address] = account;
        return account;
      });
  };
  const handleTx = async (dbTx) => {
    const { data: { from, to, value: valueStr } } = dbTx;

    const value = new BigNumber(valueStr);
    const fromAccount = await getAccount(from);
    const toAccount = await getAccount(to);
    const fromLog = {
      accountId: fromAccount.id,
      data: { balance: `-${value}` },
      transactionId: dbTx.id,
    };
    const toLog = {
      accountId: toAccount.id,
      data: { balance: `+${value}` },
      transactionId: dbTx.id,
    };
    return Promise.all([
      fromAccount.update({
        balance: new BigNumber(fromAccount.balance).minus(value).toString(),
      }, { transaction: t }),
      AccountLog.create(fromLog, { transaction: t }),
      toAccount.update({
        balance: new BigNumber(toAccount.balance).plus(value).toString(),
      }, { transaction: t }),
      AccountLog.create(toLog, { transaction: t }),
    ]);
  };
  const updateAccountsData = height => Promise.all(
    Object.values(accountMap).map(dbAccount => axios({
      params: { address: dbAccount.address, height },
      url: `${url}/v1/user/accountstate`,
    }).then(({ data }) => dbAccount
      .update({ data }, { where: { id: dbAccount.id }, transaction: t }))),
  );

  return { handleTx, updateAccountsData };
};

const handleBlockResponse = (blocks, handleTx, t) => Block
  .bulkCreate(blocks.map(parseBlock), { transaction: t })
  .then((res) => {
    console.log(`blocks from ${res[0].height} to ${res[res.length - 1].height} added`); // eslint-disable-line no-console
    let txs = [];
    const blockMap = blocks.reduce((obj, b) => {
      obj[+b.height] = b; // eslint-disable-line no-param-reassign
      return obj;
    }, {});
    res.forEach((block) => {
      const { transactions = [] } = blockMap[block.height];
      txs = txs.concat(transactions.map(tx => parseTx(block, tx)));
    });

    const txCount = txs.length;
    if (txCount) {
      console.log(`add ${txCount} transactions`); // eslint-disable-line no-console
      return Transaction
        .bulkCreate(txs, { transaction: t })
        .then(dbTxs => dbTxs
          .reduce((promise, dbTx) => promise.then(() => handleTx(dbTx)), Promise.resolve()));
    }
    return Promise.resolve();
  });

const sync = async () => {
  const [lastBlock, medState] = await Promise.all([
    Block.findOne({ order: [['id', 'desc']] }),
    axios.get(`${url}/v1/node/medstate`),
  ]);
  let currentHeight = 0;
  if (lastBlock) {
    currentHeight = +lastBlock.data.height;
  }
  const lastHeight = +medState.data.height;
  console.log(`current height ${currentHeight}, last height ${lastHeight}`); // eslint-disable-line no-console
  if (currentHeight >= lastHeight) {
    return Promise.resolve();
  }
  return db.transaction((t) => {
    const { handleTx, updateAccountsData } = accountUpdater(t);
    const getBlocks = () => {
      const from = currentHeight + 1;
      const step = Math.min(REQUEST_STEP, lastHeight - from + 1);
      const to = from + step - 1;
      return axios({
        method: 'get',
        params: { from, to },
        url: `${url}/v1/blocks`,
      }).then(res => handleBlockResponse(res.data.blocks || [], handleTx, t))
        .then(() => {
          currentHeight = to;
          if (currentHeight < lastHeight) {
            return getBlocks();
          }
          return updateAccountsData(lastHeight);
        });
    };
    return getBlocks();
  }).catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
};

export default async () => {
  setInterval(sync, UPDATE_PERIOD);
  return sync();
};
