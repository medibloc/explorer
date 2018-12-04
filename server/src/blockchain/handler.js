import axios from 'axios';
import BigNumber from 'bignumber.js';
import { URLSearchParams } from 'url';

import config from '../../config';
import db from '../db';

import AccountLog from '../accountLog/model';
import Account from '../account/model';
import Block from '../block/model';
import Transaction from '../transaction/model';

const { url } = config.blockchain;

export const parseBlock = block => ({
  data: block,
  hash: block.hash,
  height: +block.height,
  id: +block.height,
});

const parseTx = (block, tx) => ({
  blockHeight: block.height,
  blockId: block.id,
  data: tx,
  executed: tx.receipt ? tx.receipt.executed : false,
  fromAccount: tx.from,
  onChain: tx.on_chain,
  toAccount: tx.to,
  txHash: tx.hash,
});

const parseAccount = account => ({
  alias: account.alias || null,
  balance: account.balance,
  candidateId: account.candidate_id || null,
  data: account,
  vesting: account.vesting,
});

export const accountUpdater = (t) => {
  const accountMap = {};
  const accountPromise = {};
  const getAccount = (address) => {
    if (accountMap[address]) {
      return Promise.resolve(accountMap[address]);
    }
    if (accountPromise[address]) {
      return accountPromise[address];
    }
    const promise = Account.findOrCreate({ transaction: t, where: { address } })
      .then(([account]) => {
        delete accountPromise[address];
        accountMap[address] = account;
        return account;
      });
    accountPromise[address] = promise;
    return promise;
  };
  const handleBlock = async (block) => {
    const { id, data: { coinbase, reward } } = block;
    const coinbaseAccount = await getAccount(coinbase);
    return Promise.all([
      coinbaseAccount.update({
        totalAmount: new BigNumber(coinbaseAccount.totalAmount)
          .plus(new BigNumber(reward)).toString(),
      }, { transaction: t }),
      AccountLog.create({
        accountId: coinbaseAccount.id,
        blockId: id,
        data: { amount: `+${reward}` },
      }, { transaction: t }),
    ]);
  };
  const handleTx = async (dbTx) => {
    const { data: { from, to, value: valueStr } } = dbTx;

    const value = new BigNumber(valueStr);
    const fromAccount = await getAccount(from);
    const toAccount = await getAccount(to);
    const fromLog = {
      accountId: fromAccount.id,
      data: { amount: `-${value}` },
      transactionId: dbTx.id,
    };
    const toLog = {
      accountId: toAccount.id,
      data: { amount: `+${value}` },
      transactionId: dbTx.id,
    };
    return Promise.all([
      fromAccount.update({
        totalTxs: fromAccount.totalTxs + 1,
        totalAmount: new BigNumber(fromAccount.totalAmount).minus(value).toString(),
      }, { transaction: t }),
      AccountLog.create(fromLog, { transaction: t }),
      toAccount.update({
        totalTxs: toAccount.totalTxs + 1,
        totalAmount: new BigNumber(toAccount.totalAmount).plus(value).toString(),
      }, { transaction: t }),
      AccountLog.create(toLog, { transaction: t }),
    ]);
  };

  const handleRevertTx = async (dbTx) => {
    const { data: { from, to, value: valueStr } } = dbTx;

    const value = new BigNumber(valueStr);
    const fromAccount = await getAccount(from);
    const toAccount = await getAccount(to);

    // TODO @ggomma handle accountLogs
    return Promise.all([
      fromAccount.update({
        totalTxs: fromAccount.totalTxs - 1,
        totalAmount: new BigNumber(fromAccount.totalAmount).plus(value).toString(),
      }, { transaction: t }),
      toAccount.update({
        totalTxs: toAccount.totalTxs - 1,
        totalAmount: new BigNumber(toAccount.totalAmount).minus(value).toString(),
      }, { transaction: t }),
    ]);
  };

  const handleRevertBlock = async (block) => {
    const { data: { coinbase, reward } } = block;

    const coinbaseAccount = await getAccount(coinbase);

    return Promise.all([
      coinbaseAccount.update({
        totalAmount: new BigNumber(coinbaseAccount.totalAmount)
          .minus(new BigNumber(reward)).toString(),
      }, { transaction: t }),
      block.destroy({ transaction: t }),
    ]);
  };

  const updateAccountsData = height => Promise.all(Object.values(accountMap).map(dbAccount => axios({
    params: { address: dbAccount.address, height },
    url: `${url}/v1/account`,
  }).then(({ data }) => dbAccount
    .update(parseAccount(data), { where: { id: dbAccount.id }, transaction: t }))
    .catch(() => { console.log(`failed to update account ${dbAccount.address}`); }))); // eslint-disable-line no-console

  return { handleBlock, handleRevertBlock, handleRevertTx, handleTx, updateAccountsData };
};

export const handleBlockResponse = (blocks, handleTx, t) => Block
  .bulkCreate(blocks.map(parseBlock), { transaction: t })
  .then((dbBlocks) => {
    console.log(`blocks from ${dbBlocks[0].height} to ${dbBlocks[dbBlocks.length - 1].height} added`); // eslint-disable-line no-console
    let txs = [];
    const blockMap = blocks.reduce((obj, b) => {
      obj[+b.height] = b; // eslint-disable-line no-param-reassign
      return obj;
    }, {});
    dbBlocks.forEach((block) => {
      const { transactions = [] } = blockMap[block.height];
      txs = txs.concat(transactions.map(tx => parseTx(block, tx)));
    });

    const txCount = txs.length;
    if (txCount) {
      console.log(`add ${txCount} transactions`); // eslint-disable-line no-console
      return Transaction
        .bulkCreate(txs, { transaction: t })
        .then(dbTxs => dbTxs
          .reduce((promise, dbTx) => promise.then(() => handleTx(dbTx)), Promise.resolve()))
        .then(() => dbBlocks);
    }
    return dbBlocks;
  });

const topics = {
  'chain.newTailBlock': {
    onEvent: ({ hash, topic }, onReset) => axios({
      method: 'get',
      url: `${url}/v1/block?hash=${hash}`,
    }).then(async ({ data: block }) => {
      const { data: { height: lastHeight } } = await Block.findOne({ order: [['id', 'desc']] });
      if (+lastHeight + 1 < +block.height) {
        return onReset();
      }
      return db.transaction((t) => {
        const { handleBlock, handleTx, updateAccountsData } = accountUpdater(t);
        return handleBlockResponse([block], handleTx, t)
          .then(([dbBlock]) => Promise.all([
            updateAccountsData(block.height),
            handleBlock(dbBlock),
          ]).then(() => dbBlock));
      });
    })
      .then(block => pushEvent({ data: block.dataValues, topic })), // eslint-disable-line no-use-before-define, max-len
  },

  'chain.revertBlock': {
    onEvent: ({ hash }, onReset) => axios({
      method: 'get',
      url: `${url}/v1/block?hash=${hash}`,
    }).then(async ({ data: block }) => {
      const savedBlock = await Block.findOne({ order: [['id', 'desc']] });

      return db.transaction((t) => {
        const { handleRevertBlock, handleRevertTx, updateAccountsData } = accountUpdater(t);

        return Transaction.findAll({
          where: { blockHeight: block.height },
          transaction: t,
        })
          .then((dbTxs) => {
            const promises = dbTxs.map(dbTx => Promise.all([
              handleRevertTx(dbTx),
              dbTx.destroy({ transaction: t }),
            ]));
            return Promise.all(promises);
          })
          .then(() => handleRevertBlock(savedBlock))
          .then(() => updateAccountsData(block.height))
          .then(() => block.height);
      });
    }),
  },
};

const clients = Object.keys(topics).reduce((obj, key) => {
  obj[key] = {}; // eslint-disable-line no-param-reassign
  return obj;
}, {});

export const onSubscribe = (req, res, options) => {
  const { topics: reqTopics } = options;
  const requestId = res.get('X-Request-Id');
  (reqTopics || []).forEach((topic) => {
    clients[topic][requestId] = res;
  });
  req.on('close', () => {
    (reqTopics || []).forEach((topic) => {
      delete clients[topic][requestId];
    });
  });
};

export const pushEvent = (e) => {
  const { topic } = e;
  if (!clients[topic]) {
    throw new Error(`invalid topic ${topic}`);
  }
  const topicClients = Object.values(clients[topic]);
  console.log(`there are ${topicClients.length} clients`); // eslint-disable-line no-console
  topicClients.forEach((client) => {
    client.sseSend(e);
  });
};

const REQUEST_STEP = 10;

export const sync = async () => {
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
  const getBlocks = () => db.transaction((t) => {
    const { handleBlock, handleTx, updateAccountsData } = accountUpdater(t);
    const from = currentHeight + 1;
    const step = Math.min(REQUEST_STEP, lastHeight - from + 1);
    const to = from + step - 1;
    return axios({
      method: 'get',
      params: { from, to },
      url: `${url}/v1/blocks`,
    }).then((res) => {
      const blocks = res.data.blocks || [];
      return handleBlockResponse(blocks, handleTx, t)
        .then(dbBlocks => Promise.all(dbBlocks.map(handleBlock)));
    })
      .then(() => {
        currentHeight = to;
        return updateAccountsData(lastHeight);
      });
  });

  const work = () => getBlocks().then(() => {
    if (currentHeight < lastHeight) {
      return work();
    }
    return Promise.resolve();
  });

  return work().catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
};

export const startSubscribe = (promise) => {
  const reset = () => startSubscribe(sync());
  const source = axios.CancelToken.source();
  const params = new URLSearchParams();
  for (const t of Object.keys(topics)) {
    params.append('topics', t);
  }
  return axios({
    cancelToken: source.token,
    params,
    method: 'get',
    cancelPreviousRequest: true,
    responseType: 'stream',
    url: `${url}/v1/subscribe`,
  }).then(({ data }) => {
    data.on('data', (buf) => {
      const { result } = JSON.parse(buf.toString());
      if (!result) {
        source.cancel();
        reset();
        return;
      }
      const { topic } = result;
      if (!topics[topic]) {
        console.log(`topic ${topic} does not exist`); // eslint-disable-line no-console
        return;
      }
      console.log(`event ${topic} received`); // eslint-disable-line no-console
      promise = promise // eslint-disable-line no-param-reassign
        .then(() => topics[topic].onEvent(result, reset))
        .catch((err) => {
          console.log(err.message);
          return err;
        });
    });
  }).catch(() => {
    source.cancel();
    setTimeout(reset, 1000);
  });
};
