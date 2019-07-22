import axios from 'axios';
import websocket from 'websocket';
import { URLSearchParams } from 'url';

import config from '../../config';
import db from '../db';
import logger from '../logger';
import {
  requestBlockByHeight,
  requestMedState,
  requestTransactionsByHeight,
  requestTotalSupply,
} from '../utils/requester';

import { handleBlocksResponse, getBlocks, getLastBlock } from '../block/handler';
import { blockConverter } from '../converter';

const { TOPICS, TENDERMINT_URL, MEM_FIELDS } = config.BLOCKCHAIN;
const WebSocket = websocket.client;


let isSyncing = true;

const clients = Object.keys(TOPICS).reduce((obj, key) => {
  obj[key] = {}; // eslint-disable-line no-param-reassign
  return obj;
}, {});

const pushEventToClient = (e) => {
  const { topic } = e;
  if (!clients[topic]) throw new Error(`invalid topic ${topic}`);

  // now data field is stored as a string because of mysql v5.6
  e.data.data = JSON.parse(e.data.data);

  const topicClients = Object.values(clients[topic]);
  logger.debug(`there are ${topicClients.length} clients`);
  topicClients.forEach(client => client.sseSend(e));
};

TOPICS.newTailBlock.onEvent = async (block, onReset) => {
  const { height: lastHeight } = await getLastBlock();
  // if explorer does not have full blocks
  if (+lastHeight + 1 < +block.height) return onReset();

  const detailedBlock = await requestBlockByHeight(block.height);
  const supplyData = await requestTotalSupply();
  MEM_FIELDS.notBondedTokens = supplyData.notBondedTokens;
  MEM_FIELDS.bondedTokens = supplyData.bondedTokens;
  MEM_FIELDS.totalSupply = supplyData.totalSupply;
  detailedBlock.txs = await requestTransactionsByHeight(block.height);

  return db
    .transaction(t => handleBlocksResponse([detailedBlock], t))
    .then(dbBlocks => pushEventToClient({
      data: {
        ...dbBlocks[0].dataValues,
        supply: MEM_FIELDS.totalSupply,
      },
      topic: 'newTailBlock',
    }));
};

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

export const sync = async (stopSync = false) => {
  const lastBlock = await getLastBlock();
  const medState = await requestMedState();

  // CASE A : If DB is empty
  let currentHeight = 0;
  // CASE B : If DB already holds block data
  if (lastBlock) currentHeight = +lastBlock.data.height;

  const lastHeight = +medState.last_block_height;
  logger.debug(`current height ${currentHeight}, last height ${lastHeight}`);
  if (currentHeight === lastHeight && medState.tail === lastBlock.hash) {
    return Promise.resolve();
  }
  // If db holds old data because tail block height does not reached to currentHeight yet
  if (currentHeight > lastHeight) {
    logger.error('DB Initialization is required');
    process.exit(1);
  }

  const work = prevCurrentHeight => getBlocks(prevCurrentHeight, lastHeight)
    .then((postCurrentHeight) => {
      if (postCurrentHeight < lastHeight) {
        if (stopSync) return Promise.resolve();
        return work(postCurrentHeight);
      }
      isSyncing = false;
      return Promise.resolve();
    });

  return work(currentHeight)
    .catch((err) => {
      logger.error(err.stack);
      process.exit(1);
    });
};

let call = null;
export const startSubscribe = (promise) => {
  // eslint-disable-next-line no-param-reassign
  promise = promise.then(async () => {
    // await updateAllAccountsDataAfterSync();
    logger.debug('SYNC IS DONE');
  });

  const reset = stopSync => startSubscribe(sync(stopSync));

  if (call) call.cancel('Previous request is canceled');
  call = axios.CancelToken.source();
  const params = new URLSearchParams();
  for (const t of Object.keys(TOPICS)) { // eslint-disable-line
    params.append('topics', t);
  }

  let initialResponse = true;

  return new Promise((resolve, reject) => {
    const client = new WebSocket();
    client.on('connectFailed', err => console.log('connection failed : ', err));
    client.on('connect', (conn) => {
      console.log('connected to the blockchain');
      conn.on('error', (err) => {
        logger.error(err.stack);
        reject(err);
      });
      conn.on('close', () => logger.debug('close websocket'));
      conn.on('message', ({ utf8Data }) => {
        if (initialResponse) {
          initialResponse = false; // to ignore initial setup response
        } else {
          if (!utf8Data) {
            logger.error('Reset syncing because server got empty response.');
            reset();
            return;
          }

          const block = blockConverter(JSON.parse(utf8Data).result.data.value);
          logger.debug(`newTailBlock received | height : ${block.height}`);
          promise = promise // eslint-disable-line no-param-reassign
            .then(() => TOPICS.newTailBlock.onEvent(block, reset))
            .catch((err) => {
              logger.error(err.stack);
              return err;
            });
          if (!isSyncing) {
            resolve();
          }
        }
      });

      const subscriptionData = {
        method: 'subscribe',
        params: {
          query: "tm.event='NewBlock'",
        },
      };
      conn.send(JSON.stringify(subscriptionData));
    });
    client.connect(TENDERMINT_URL.ws);
  });
};
