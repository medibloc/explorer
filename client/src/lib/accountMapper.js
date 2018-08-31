import { divider } from './bigNumCalculator';

const accountMapper = (account, totalSupply = undefined) => {
  const tempAmount = divider(account.balance, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Balance = `${tempAmount.join('.')} MED`;

  return {
    Account: account.address,
    Balance,
    Transactions: account.txs_from.length + account.txs_to.length,
    Percentage: totalSupply ? `${divider(account.balance, [totalSupply, 10 ** 12 / 100], 5)}` : 0,
  };
};

export default accountMapper;
