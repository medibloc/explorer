import axios from 'axios';

import config from '../../config';

import db from '../db';

import Block from '../block/model';

import { accountUpdater, handleBlockResponse, startSubscribe } from './handler';

const { url } = config.blockchain;

const REQUEST_STEP = 100;

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
        /*
        if (currentHeight < lastHeight) {
          return getBlocks();
        }
        */
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

export default async () => startSubscribe(sync());
