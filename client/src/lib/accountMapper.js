import { divider } from './bigNumCalculator';

const accountMapper = (account, totalSupply = undefined) => {
  const tempAmount = divider(account.balance, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Balance = `${tempAmount.join('.')} MED`;

  const Staking = account.data ? `${divider(account.data.staking, [10 ** 12]).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} MED` : null;

  return {
    Account: account.address,
    Balance,
    Transactions: account.totalTxs,
    Percentage: totalSupply ? `${divider(account.balance, [totalSupply, 10 ** 12 / 100], 5)}` : 0,
    Staking,
  };
};

export default accountMapper;
