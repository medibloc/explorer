const txMapper = tx => ({
  'Transaction Hash': tx.hash,
  Status: tx.executed ? 'Confirm' : 'Pending',
  'Time Stamp': tx.timestamp,
  From: tx.from,
  To: tx.to,
  Amount: `${parseInt(tx.value, 10).toLocaleString()} MED`,
  Nonce: tx.nonce,
  Signature: tx.sign,
});

export default txMapper;
