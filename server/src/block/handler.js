import Block from './model';
import Transaction from '../transaction/model';
import { updateCoinbaseAccount, updateTxToAccounts } from '../account/handler';
import { requestBlockByHeight } from '../utils/requester';

// eslint-disable-next-line import/prefer-default-export
export const handleRevertBlocks = async (block, newBlocks, t) => {
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
