import { divider } from './bigNumCalculator';

const txMapper = tx => ({
  'Transaction Hash': tx.hash,
  Status: tx.executed ? 'Confirm' : 'Pending',
  'Time Stamp': tx.timestamp,
  From: tx.from,
  To: tx.to,
  Amount: `${divider(tx.value, [10 ** 12]).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} MED`,
  Nonce: tx.nonce,
  Signature: tx.sign,
});

export default txMapper;
