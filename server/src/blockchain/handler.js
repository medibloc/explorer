import axios from 'axios';
import { URLSearchParams } from 'url';

import config from '../../config';
import db from '../db';
import { requestMedState } from '../utils/requester';

import Block from '../block/model';

import { updateAllAccountsDataAfterSync } from '../account/handler';
import { handleBlocksResponse, getBlocks } from '../block/handler';

const { url } = config.blockchain;

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
