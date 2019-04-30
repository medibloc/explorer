import Block from './model';
import { updateCoinbaseAccount, updateTxToAccounts } from '../account/handler';
import {
  getTransactionsWithBlockHeight, handleTxsInDbBlock,
  removeTransactionsWithBlockHeight,
} from '../transaction/handler';
import { requestBlockByHeight } from '../utils/requester';
import { isIdentical } from '../utils/checker';

export const handleRevertBlocks = async (block, newBlocks, t) => {
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

export const verifyBlocks = blocks => (
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

export const applyBlockData = async (dbBlocks, t) => {
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
