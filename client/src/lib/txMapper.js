import { divider } from './bigNumCalculator';

const txMapper = (tx) => {
  const tempAmount = divider(tx.value, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Amount = `${tempAmount.join('.')} MED`;

  return {
    'Transaction Hash': tx.hash,
    Status: tx.executed ? 'Confirm' : 'Pending',
    'Time Stamp': tx.timestamp,
    From: tx.from,
    To: tx.to,
    Amount,
    Nonce: tx.nonce,
    Signature: tx.sign,
  };
};

export default txMapper;
