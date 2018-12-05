import axios from 'axios';
import BigNumber from 'bignumber.js';
import { URLSearchParams } from 'url';

import config from '../../config';
import db from '../db';
// import { isRevert } from '../utils/checker';
import { parseBlock, parseTx, parseAccount } from '../utils/parser';
import { requestBlockByHeight, requestBlocks, requestAccount } from '../utils/requester';

import Account from '../account/model';
import Block from '../block/model';
import Transaction from '../transaction/model';

const { url } = config.blockchain;

const getAccountFromDB = (address, t) => Account
  .findOrCreate({ where: { address }, transaction: t })
  .then(accounts => accounts[0]);

const updateTxToAccounts = async (rawTx, t, revert = false) => {
  const { from, to, value: valueStr } = rawTx;
  const value = new BigNumber(revert ? `-${valueStr}` : valueStr);
  const fromAccount = await getAccountFromDB(from, t);
  const toAccount = await getAccountFromDB(to, t);

  return Promise.all([
    fromAccount.update({
      totalTxs: fromAccount.totalTxs + (revert ? -1 : 1),
      totalAmount: new BigNumber(fromAccount.totalAmount).minus(value).toString(),
    }, { transaction: t }),
    toAccount.update({
      totalTxs: toAccount.totalTxs + (revert ? -1 : 1),
      totalAmount: new BigNumber(toAccount.totalAmount).plus(value).toString(),
    }, { transaction: t }),
  ])
    .catch(() => console.log(`failed to update tx to accounts ${rawTx.hash}`));
};

const updateCoinbaseAccount = async (rawBlock, t, revert = false) => {
  const { coinbase, reward: rewardStr } = rawBlock;
  const reward = new BigNumber(revert ? `-${rewardStr}` : rewardStr);
  const coinbaseAccount = await getAccountFromDB(coinbase, t);

  return coinbaseAccount.update({
    totalAmount: new BigNumber(coinbaseAccount.totalAmount).plus(reward).toString(),
  }, { transaction: t })
    .catch(() => console.log(`failed to update coinbase account ${coinbaseAccount.address}`));
};

const updateAccountData = (address, height, t) => requestAccount({ address, height })
  .then(async (rawAcc) => {
    const acc = await getAccountFromDB(address, t);
    return acc.update(parseAccount(rawAcc), { where: { id: acc.id }, transaction: t })
      .catch(() => console.log(`failed to update account ${acc.address}`));
  });

const handleTxsInBlockResponse = async (block, txs, t) => {
  const parsedTxs = [];
  txs.map(tx => parsedTxs.push(parseTx(block, tx)));
  await updateCoinbaseAccount(block.data, t);

  return Transaction
    .bulkCreate(parsedTxs, { transaction: t })
    .then(async (dbTxs) => {
      await dbTxs.reduce((p, dbTx) => p.then(
        () => updateTxToAccounts(dbTx.data, t),
      ), Promise.resolve());
      /*
      const promises = dbTxs.map(async (dbTx) => {
        await updateTxToAccounts(dbTx.data, t);
      });
      await Promise.all(promises);
      */
      return dbTxs;
    });
};

const retrieveAffectedAccountsFromTxs = (txs) => {
  const affectedAccounts = [];
  txs.forEach(tx => affectedAccounts.push(tx.from, tx.to));
  return affectedAccounts;
};

const handleBlocksResponse = async (blocks, t) => {
  const parentHeight = +blocks[0].height - 1;
  const parentBlock = await Block.findById(parentHeight);
  if (parentBlock === null && parentHeight !== 0) {
    requestBlockByHeight(parentHeight)
      .then(block => db.transaction(T => handleBlocksResponse(block, T)));
  }

  return Block
    .bulkCreate(blocks.map(parseBlock), { transaction: t })
    .then(async (dbBlocks) => {
      console.log(`blocks from ${dbBlocks[0].height} to ${dbBlocks[dbBlocks.length - 1].height} added`);

      let txCount = 0;
      const affectedAccounts = [];
      const promise = dbBlocks.reduce((p, dbBlock) => p
        .then(async () => {
          txCount += dbBlock.data.transactions.length;
          await handleTxsInBlockResponse(dbBlock, dbBlock.data.transactions, t);
          affectedAccounts.push(...retrieveAffectedAccountsFromTxs(dbBlock.data.transactions));
        }), Promise.resolve());
      /*
      let promises = dbBlocks.map(async (dbBlock) => {
        txCount += dbBlock.data.transactions.length;
        await handleTxsInBlockResponse(dbBlock, dbBlock.data.transactions, t);
        affectedAccounts.push(...retrieveAffectedAccountsFromTxs(dbBlock.data.transactions));
      });
      await Promise.all(promises);
      */
      await promise;

      const promises = affectedAccounts.map(async address => updateAccountData(
        address, dbBlocks[dbBlocks.length - 1].height, t,
      ));
      await Promise.all(promises);

      if (txCount) {
        console.log(`add ${txCount} transactions`);
      }
      return dbBlocks;
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

const topics = {
  'chain.newTailBlock': {
    onEvent: ({ hash, topic }, onReset) => axios({
      method: 'get',
      url: `${url}/v1/block?hash=${hash}`,
    }).then(async ({ data: block }) => {
      const { data: { height: lastHeight } } = await Block.findOne({ order: [['id', 'desc']] });
      if (+lastHeight + 1 < +block.height) return onReset();

      return db.transaction(t => handleBlocksResponse(block, t));
    }).then(dbBlocks => pushEvent({ data: dbBlocks[0].dataValues, topic })),
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
    const from = currentHeight + 1;
    const step = Math.min(REQUEST_STEP, lastHeight - from + 1);
    const to = from + step - 1;
    return requestBlocks({ from, to })
      .then(blocks => handleBlocksResponse(blocks, t))
      .then(() => {
        currentHeight = to;
      })
      .catch((err) => {
        throw err;
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
  for (const t of Object.keys(topics)) { // eslint-disable-line
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
