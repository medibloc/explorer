import axios from 'axios';
import { URLSearchParams } from 'url';

import config from '../../config';
import db from '../db';
import { isIdentical, isReverted } from '../utils/checker';
import { parseBlock, parseTx } from '../utils/parser';
import {
  requestBlockByHeight, requestBlocks,
  requestTransaction, requestMedState,
} from '../utils/requester';

import Block from '../block/model';
import Transaction from '../transaction/model';

import {
  updateTxToAccounts,
  updateCoinbaseAccount,
  updateAllAccountsDataAfterSync,
} from '../account/handler';

const { url } = config.blockchain;
const { REQUEST_STEP } = config.request;

const handleTxsInDbBlock = async (dbBlock, t) => {
  const block = dbBlock.data;
  let parsedTxs = [];

  // getBlock contains all transaction data
  if (block.transactions.length !== 0) {
    parsedTxs = block.transactions.map(tx => parseTx(dbBlock, tx));
  } else if (block.tx_hashes.length !== 0) { // getBlocks only contains hashes
    parsedTxs = await Promise.all(block.tx_hashes.map(async (txHash) => {
      const tx = await requestTransaction(txHash);
      return parseTx(dbBlock, tx);
    }));
  }

  await updateCoinbaseAccount(block, t);

  return Transaction
    .bulkCreate(parsedTxs, { transaction: t })
    .then(async (dbTxs) => {
      await dbTxs.reduce((p, dbTx) => p.then(
        () => updateTxToAccounts(dbTx.data, t),
      ), Promise.resolve());

      return dbTxs;
    });
};

const retrieveAffectedAccountsFromDbTxs = (DbTxs) => {
  const affectedAccounts = [];
  DbTxs.forEach(dbTx => affectedAccounts.push(dbTx.fromAccount, dbTx.toAccount));
  return affectedAccounts;
};

const handleRevertBlocks = async (block, newBlocks, t) => {
  const parentHeight = +block.height - 1;
  const parentBlock = await Block.findByPk(parentHeight);
  if (parentBlock.hash !== block.parent_hash) {
    const transactions = await Transaction.findAll({
      where: { blockHeight: parentHeight },
      transaction: t,
    });

    // Revert account state from revert transactions
    await transactions.reduce((p, dbTx) => p.then(
      () => updateTxToAccounts(dbTx.data, t, true),
    ), Promise.resolve());

    // Revert coinbase account
    await updateCoinbaseAccount(parentBlock.data, t, true);

    // Remove transactions from parentBlock.
    await Transaction.destroy({ where: { blockHeight: parentHeight }, transaction: t });

    return requestBlockByHeight(parentHeight)
      .then(newParentBlock => (
        handleRevertBlocks(newParentBlock, [newParentBlock, ...newBlocks], t)
      ));
  }
  return newBlocks;
};

const handleBlocksResponse = async (blocks, t) => {
  let reverted = false;

  // Check if the parent block exists
  const parentHeight = +blocks[0].height - 1;
  const parentBlock = await Block.findByPk(parentHeight);
  // If parentBlock doesn't exist
  if (parentBlock === null && parentHeight !== 0) {
    await requestBlockByHeight(parentHeight)
      .then(block => handleBlocksResponse([block], t));
  }

  // Check if the block is already saved
  if (parentBlock !== null && isReverted(blocks[0], parentBlock)) {
    reverted = true;
    console.log(`revert block received ${blocks[0].height}`);
    const newBlocks = await handleRevertBlocks(blocks[0], [], t);
    blocks = [...newBlocks, ...blocks]; // eslint-disable-line no-param-reassign
  }

  const verifiedBlocks = await Promise.all(
    blocks.map(async (block) => {
      const blockInDB = await Block.findByPk(block.height);

      if (!blockInDB) {
        return block;
      }

      if (isIdentical(block, blockInDB.data)) {
        console.log(`identical block received : ${block.height}`);
        return block;
      }

      return block;
    }),
  );

  return Block
    .bulkCreate(verifiedBlocks.map(parseBlock), {
      transaction: t,
      updateOnDuplicate: ['data', 'hash'],
    })
    .then(async (dbBlocks) => {
      if (dbBlocks.length === 0) return [];
      console.log(`blocks from ${dbBlocks[0].height} to ${dbBlocks[dbBlocks.length - 1].height} added`);

      let txCount = 0;
      const affectedAccounts = [];

      await dbBlocks.reduce((p, dbBlock) => p
        .then(async () => {
          txCount += dbBlock.data.transactions.length;
          const dbTxs = await handleTxsInDbBlock(dbBlock, t);
          if (reverted) {
            const accounts = retrieveAffectedAccountsFromDbTxs(dbTxs);

            accounts.forEach((acc) => {
              if (!affectedAccounts.includes(acc)) affectedAccounts.push(acc);
            });
          }
        }), Promise.resolve());

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

      return db.transaction(t => handleBlocksResponse([block], t));
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


let stopSync = false;
export const sync = async () => {
  const lastBlock = await Block.findOne({ order: [['id', 'desc']] });
  const medState = await requestMedState();

  // CASE A : If DB is empty
  let currentHeight = 0;
  // CASE B : If DB already holds block data
  if (lastBlock) currentHeight = +lastBlock.data.height;

  const lastHeight = +medState.height;
  console.log(`current height ${currentHeight}, last height ${lastHeight}`); // eslint-disable-line no-console
  if (currentHeight === lastHeight && medState.tail === lastBlock.hash) {
    return Promise.resolve();
  }
  // If db holds old data because tail block height does not reached to currentHeight yet
  if (currentHeight > lastHeight) {
    console.error('DB Initialization is required');
    process.exit(1);
  }

  // getBlocks is used only for sync
  const getBlocks = () => db.transaction((t) => {
    const from = currentHeight + 1; // TODO consider revert block case
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
      if (stopSync) return Promise.resolve();
      return work();
    }
    return Promise.resolve();
  });

  return work().catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
};

let call = null;
export const startSubscribe = (promise) => {
  promise = promise.then(async () => {
    console.log('SYNC IS DONE');
    await updateAllAccountsDataAfterSync();
  });

  const reset = () => {
    stopSync = false;
    return startSubscribe(sync());
  };
  if (call) {
    call.cancel('Previous request is canceled');
  }
  call = axios.CancelToken.source();
  const params = new URLSearchParams();
  for (const t of Object.keys(topics)) { // eslint-disable-line
    params.append('topics', t);
  }

  return axios({
    cancelToken: call.token,
    params,
    method: 'get',
    cancelPreviousRequest: true,
    responseType: 'stream',
    url: `${url}/v1/subscribe`,
  }).then(({ data }) => {
    console.log('start subscribing');
    data.on('data', (buf) => {
      const { result } = JSON.parse(buf.toString());
      if (!result) {
        call.cancel('Reset syncing because server got empty response.');
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
    console.log('Something is wrong while subscribing,');
    stopSync = true;
    setTimeout(reset, 1000);
  });
};
