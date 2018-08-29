const accountMapper = (account, totalSupply = undefined) => ({
  Account: account.address,
  Balance: `${parseInt(account.balance, 10).toLocaleString()} MED`,
  Transactions: account.txs_from.length + account.txs_to.length,
  Percentage: totalSupply ? `${(parseInt(account.balance, 10) / totalSupply * 100).toFixed(5)}%` : 0,
});

export default accountMapper;
