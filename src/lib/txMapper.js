const txMapper = tx => ({
  'Transaction Hash': tx.hash,
  Status: tx.executed,
  'Time Stamp': tx.timestamp,
  From: tx.from,
  To: tx.to,
  Amount: tx.value,
  Nonce: tx.nonce,
  Signature: tx.sign,
});

export default txMapper;
