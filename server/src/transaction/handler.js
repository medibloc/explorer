import { parseTx } from '../utils/parser';
import { updateTxToAccounts } from '../account/handler';
import Transaction from './model';
import { requestTransactionsByHeight } from '../utils/requester';

// eslint-disable-next-line import/prefer-default-export
export const handleTxsInDbBlock = async (dbBlock, t) => {
  const block = dbBlock.data;
  let parsedTxs = [];

  // getBlock contains all transaction data
  if (block.txs.length !== 0) {
    if (block.txs[0].blockHeight) {
      parsedTxs = block.txs.map(tx => parseTx(dbBlock, tx));
    } else {
      const txs = await requestTransactionsByHeight(block.height);
      parsedTxs = txs.map(tx => parseTx(dbBlock, tx));
    }
  }

  return Transaction
    .bulkCreate(parsedTxs, { transaction: t })
    .then(async (dbTxs) => {
      await dbTxs.reduce((p, dbTx) => p.then(
        () => updateTxToAccounts(dbTx.data, t),
      ), Promise.resolve());

      return dbTxs;
    });
};
