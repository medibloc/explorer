import Block from './model';
import db from '../db';
import { updateCoinbaseAccount, updateTxToAccounts } from '../account/handler';
import {
  getTransactionsWithBlockHeight, handleTxsInDbBlock,
  removeTransactionsWithBlockHeight,
} from '../transaction/handler';
import { requestBlockByHeight, requestBlocks } from '../utils/requester';
import { isIdentical, isReverted } from '../utils/checker';
import { parseBlock } from '../utils/parser';
import config from '../../config';

const { REQUEST_STEP } = config.request;


const handleRevertBlocks = async (block, newBlocks, t) => {
  const parentHeight = +block.height - 1;
  const parentBlock = await Block.findByPk(parentHeight);
  if (parentBlock.hash !== block.parent_hash) {
    console.log(`revert block received ${parentHeight}`);
    const transactions = await getTransactionsWithBlockHeight(parentHeight, t);

    // Remove transactions from parentBlock.
    await removeTransactionsWithBlockHeight(parentHeight, t);

    // Revert account state from revert transactions
    await transactions.reduce((p, dbTx) => p.then(
      () => updateTxToAccounts(dbTx.data, t, true),
    ), Promise.resolve());

    // Revert coinbase account
    await updateCoinbaseAccount(parentBlock.data, t, true);

    return requestBlockByHeight(parentHeight)
      .then(newParentBlock => (
        handleRevertBlocks(newParentBlock, [newParentBlock, ...newBlocks], t)
      ));
  }
  return newBlocks;
};

const verifyBlocks = blocks => (
  Promise.all(blocks.map(async (block) => {
    const blockInDB = await Block.findByPk(block.height);

    if (!blockInDB) return block;
    if (isIdentical(block, blockInDB.data)) {
      console.log(`identical block received : ${block.height}`);
      return block;
    }

    return block;
  }))
);

const applyBlockData = async (dbBlocks, t) => {
  let txCount = 0;
  await dbBlocks.reduce((p, dbBlock) => p
    .then(async () => {
      txCount += Math.max(
        dbBlock.data.transactions.length, dbBlock.data.tx_hashes.length,
      );

      await handleTxsInDbBlock(dbBlock, t);
      return true;
    }), Promise.resolve());

  if (txCount) console.log(`add ${txCount} transactions`);
};

// eslint-disable-next-line import/prefer-default-export
export const handleBlocksResponse = async (blocks, t) => {
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
    const newBlocks = await handleRevertBlocks(blocks[0], [], t);
    blocks = [...newBlocks, ...blocks]; // eslint-disable-line no-param-reassign
  }

  const verifiedBlocks = await verifyBlocks(blocks);

  return Block
    .bulkCreate(verifiedBlocks.map(parseBlock), {
      transaction: t,
      updateOnDuplicate: ['data', 'hash'],
    })
    .then(async (dbBlocks) => {
      await applyBlockData(dbBlocks, t);
      return dbBlocks;
    });
};

export const getBlocks = (currentHeight, lastHeight) => db.transaction((t) => {
  const from = currentHeight + 1;
  const step = Math.min(REQUEST_STEP, lastHeight - from + 1);
  const to = from + step - 1;

  return requestBlocks({ from, to })
    .then(blocks => handleBlocksResponse(blocks, t))
    .then(() => to)
    .catch((err) => {
      throw err;
    });
});

export const getLastBlock = () => Block.findOne({ order: [['id', 'desc']] });
