import { divider } from './bigNumCalculator';

const accountMapper = (account, totalSupply = undefined) => ({
  Account: account.address,
  Balance: `${divider(account.balance, [10 ** 12]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MED`,
  Transactions: account.txs_from.length + account.txs_to.length,
  Percentage: totalSupply ? `${divider(account.balance, [totalSupply, 10 ** 12 / 100], 5)}` : 0,
});

export default accountMapper;
