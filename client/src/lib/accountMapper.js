const accountMapper = account => ({
  Account: account.address,
  Balance: `${parseInt(account.balance, 10).toLocaleString()} MED`,
  Transactions: account.txs_from.length + account.txs_to.length,
  Percentage: 0,
});

export default accountMapper;
