import { divider } from './bigNumCalculator';

const accountMapper = (account, totalSupply = undefined) => {
  const tempAmount = divider(account.balance, [10 ** 9]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Balance = `${tempAmount.join('.')} MED`;

  const Staking = account.staking ? `${divider(account.staking, [10 ** 9], 2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} MED` : null;

  return {
    Account: account.address,
    Balance,
    Transactions: account.totalTxs,
    Percentage: totalSupply ? `${divider(account.balance, [totalSupply, 10 ** 9 / 100], 5)}` : 0,
    Staking,
  };
};

export default accountMapper;
