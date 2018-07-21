import timeConverter from './timeConverter';

const txMapper = tx => ({
  'Transaction Hash': tx.hash,
  Status: tx.executed,
  'Time Stamp': timeConverter(tx.timestamp),
  From: tx.from,
  To: tx.to,
  Amount: `${tx.value} MED`,
  Nonce: tx.nonce,
  Signature: tx.sign,
});

export default txMapper;
