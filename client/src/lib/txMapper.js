import { local } from 'medjs';
import { divider } from './bigNumCalculator';

const { recoverDefaultPayload } = local.transaction;

const txMapper = (tx) => {
  const tempAmount = divider(tx.value, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Amount = `${tempAmount.join('.')} MED`;

  let payload = ''
  if (tx.payload !== '' && tx.payload !== undefined) payload = recoverDefaultPayload(tx.payload);

  return {
    'Transaction Hash': tx.hash,
    Status: tx.executed ? 'Confirm' : 'Pending',
    'Time Stamp': tx.timestamp,
    From: tx.from,
    To: tx.to,
    Amount,
    Message: payload,
    Nonce: tx.nonce,
    Signature: tx.sign,
  };
};

export default txMapper;
