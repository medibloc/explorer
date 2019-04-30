import { parseTx } from '../utils/parser';
import { requestTransaction } from '../utils/requester';
import { updateCoinbaseAccount, updateTxToAccounts } from '../account/handler';
import Transaction from './model';

export const handleTxsInDbBlock = async (dbBlock, t) => {
  const block = dbBlock.data;
  let parsedTxs = [];

  // getBlock contains all transaction data
  if (block.transactions.length !== 0) {
    parsedTxs = block.transactions.map(tx => parseTx(dbBlock, tx));
  } else if (block.tx_hashes.length !== 0) { // getBlocks only contains hashes
    parsedTxs = await Promise.all(block.tx_hashes.map(async (txHash) => {
      const tx = await requestTransaction(txHash);
      return parseTx(dbBlock, tx);
    }));
  }

  await updateCoinbaseAccount(block, t);

  return Transaction
    .bulkCreate(parsedTxs, { transaction: t })
    .then(async (dbTxs) => {
      await dbTxs.reduce((p, dbTx) => p.then(
        () => updateTxToAccounts(dbTx.data, t),
      ), Promise.resolve());

      return dbTxs;
    });
};

export const retrieveAffectedAccountsFromDbTxs = (DbTxs) => {
  const affectedAccounts = [];
  DbTxs.forEach(dbTx => affectedAccounts.push(dbTx.fromAccount, dbTx.toAccount));
  return affectedAccounts;
};
