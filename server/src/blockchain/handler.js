import axios from 'axios';
import { URLSearchParams } from 'url';

import config from '../../config';
import db from '../db';
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
  console.log(`there are ${topicClients.length} clients`); // eslint-disable-line no-console
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
  console.log(`current height ${currentHeight}, last height ${lastHeight}`); // eslint-disable-line no-console
  if (currentHeight === lastHeight && medState.tail === lastBlock.hash) {
    return Promise.resolve();
  }
  // If db holds old data because tail block height does not reached to currentHeight yet
  if (currentHeight > lastHeight) {
    console.error('DB Initialization is required');
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

  const reset = stopSync => startSubscribe(sync(stopSync));

  if (call) {
    call.cancel('Previous request is canceled');
  }
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
    console.log('start subscribing');
    data.on('data', (buf) => {
      const { result } = JSON.parse(buf.toString());
      if (!result) {
        call.cancel('Reset syncing because server got empty response.');
        reset();
        return;
      }
      const { topic } = result;
      if (!TOPICS[topic]) {
        console.log(`topic ${topic} does not exist`);
        return;
      }
      console.log(`event ${topic} received`); // eslint-disable-line no-console
      promise = promise // eslint-disable-line no-param-reassign
        .then(() => TOPICS[topic].onEvent(result, reset))
        .catch((err) => {
          console.log(err.message);
          return err;
        });
    });
  }).catch(() => {
    console.log('Something is wrong while subscribing,');
    setTimeout(() => reset(true), 1000);
  });
};
