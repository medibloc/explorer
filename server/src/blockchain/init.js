import axios from 'axios';

import config from '../../config';

import db from '../db';
import Block from '../block/model';
import Transaction from '../transaction/model';

const { url } = config.blockchain;

const REQUEST_STEP = 100;

const parseBlock = block => ({
  data: block,
  height: +block.height,
  id: +block.height,
});

const parseTransaction = (block, tx) => ({
  blockId: block.id,
  data: tx,
  txHash: tx.hash,
});

const handleBlockResponse = (blocks, t) => Block
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
      txs = txs.concat(transactions.map(tx => parseTransaction(block, tx)));
    });

    const txCount = txs.length;
    if (txCount) {
      console.log(`add ${txCount} transactions`); // eslint-disable-line no-console
      return Transaction.bulkCreate(txs, { transaction: t });
    }
    return Promise.resolve();
  });

export default async () => {
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
    const getBlocks = () => {
      const from = currentHeight + 1;
      const step = Math.min(REQUEST_STEP, lastHeight - from + 1);
      const to = from + step - 1;
      return axios({
        method: 'get',
        params: { from, to },
        url: `${url}/v1/blocks`,
      }).then(res => handleBlockResponse(res.data.blocks || [], t))
        .then(() => {
          currentHeight = to;
          if (currentHeight < lastHeight) {
            return getBlocks();
          }
          return null;
        })
        .catch(console.error); // eslint-disable-line no-console
    };
    return getBlocks();
  });
};
