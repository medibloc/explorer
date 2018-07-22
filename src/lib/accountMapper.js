const accountMapper = account => ({
  Account: account.address,
  Balance: `${parseInt(account.balance, 10).toLocaleString()} MED`,
  Transactions: account.txs_send.length + account.txs_get.length,
  Percentage: 0,
});

export default accountMapper;
