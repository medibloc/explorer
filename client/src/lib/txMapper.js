import { divider } from './bigNumCalculator';
import { txTypes } from '../config';

const txMapper = (tx) => {
  const tempAmount = divider(tx.value, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Amount = `${tempAmount.join('.')} MED`;

  return {
    'Block Height': tx.blockHeight,
    'Transaction Hash': tx.txHash,
    Status: tx.executed ? 'Success' : 'Fail',
    From: tx.fromAccount,
    To: tx.toAccount,
    Type: tx.type.split('/')[1],
    Amount,
    Message: '',
    // Nonce: tx.nonce,
    // Signature: tx.sign,
  };
};

export default txMapper;
