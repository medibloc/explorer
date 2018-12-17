const parseBlock = block => ({
  data: block,
  hash: block.hash,
  height: +block.height,
  id: +block.height,
});

const parseTx = (block, tx) => ({
  blockHeight: block.height,
  blockId: block.id,
  data: tx,
  executed: tx.receipt ? tx.receipt.executed : false,
  fromAccount: tx.from,
  onChain: tx.on_chain,
  toAccount: tx.to,
  txHash: tx.hash,
});

const parseAccount = account => ({
  alias: account.alias || null,
  balance: account.balance,
  candidateId: account.candidate_id || null,
  data: account,
  staking: account.staking,
});

export {
  parseBlock,
  parseTx,
  parseAccount,
};
