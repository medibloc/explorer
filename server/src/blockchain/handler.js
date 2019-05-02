import axios from 'axios';
import { URLSearchParams } from 'url';

import config from '../../config';
import db from '../db';
import logger from '../logger';
import { requestBlockByHash, requestMedState } from '../utils/requester';

import { updateAllAccountsDataAfterSync } from '../account/handler';
import { handleBlocksResponse, getBlocks, getLastBlock } from '../block/handler';

const { URL, TOPICS } = config.BLOCKCHAIN;

const clients = Object.keys(TOPICS).reduce((obj, key) => {
  obj[key] = {}; // eslint-disable-line no-param-reassign
  return obj;
}, {});

const pushEventToClient = (e) => {
  const { topic } = e;
  if (!clients[topic]) throw new Error(`invalid topic ${topic}`);

  const topicClients = Object.values(clients[topic]);
  logger.debug(`there are ${topicClients.length} clients`);
  topicClients.forEach(client => client.sseSend(e));
};

TOPICS['chain.newTailBlock'].onEvent = ({ hash, topic }, onReset) => requestBlockByHash(hash)
  .then(async (block) => {
    const { height: lastHeight } = await getLastBlock();
    // if explorer does not have full blocks
    if (+lastHeight + 1 < +block.height) return onReset();

    return db.transaction(t => handleBlocksResponse([block], t));
  }).then(dbBlocks => pushEventToClient({ data: dbBlocks[0].dataValues, topic }));


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

  const lastHeight = +medState.height;
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
      return Promise.resolve();
    });

  return work(currentHeight).catch((err) => {
    logger.error(err.stack);
    process.exit(1);
  });
};

let call = null;
export const startSubscribe = (promise) => {
  // eslint-disable-next-line no-param-reassign
  promise = promise.then(async () => {
    await updateAllAccountsDataAfterSync();
    logger.debug('SYNC IS DONE');
  });

  const reset = stopSync => startSubscribe(sync(stopSync));

  if (call) call.cancel('Previous request is canceled');
  call = axios.CancelToken.source();
  const params = new URLSearchParams();
  for (const t of Object.keys(TOPICS)) { // eslint-disable-line
    params.append('topics', t);
  }

  return axios({
    cancelToken: call.token,
    params,
    method: 'get',
    cancelPreviousRequest: true,
    responseType: 'stream',
    url: `${URL}/v1/subscribe`,
  }).then(({ data }) => {
    logger.debug('start subscribing');
    data.on('data', (buf) => {
      const { result } = JSON.parse(buf.toString());
      if (!result) {
        logger.error('Reset syncing because server got empty response.');
        call.cancel('Reset syncing because server got empty response.');
        reset();
        return;
      }
      const { topic } = result;
      if (!TOPICS[topic]) {
        logger.warn(`topic ${topic} does not exist`);
        return;
      }
      logger.debug(`event ${topic} received`);
      promise = promise // eslint-disable-line no-param-reassign
        .then(() => TOPICS[topic].onEvent(result, reset))
        .catch((err) => {
          logger.error(err.stack);
          return err;
        });
    });
  }).catch((e) => {
    logger.error(e.stack);
    setTimeout(() => reset(true), 1000);
  });
};
