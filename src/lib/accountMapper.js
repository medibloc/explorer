const accountMapper = account => ({
  Account: account.address,
  Balance: account.balance,
  Transactions: account.txs_send.length + account.txs_get.length,
  Percentage: 0,
});

export default accountMapper;
