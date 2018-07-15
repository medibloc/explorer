const blockMapper = block => ({
  'Block Height': block.height,
  'Time Stamp': block.timestamp,
  'Block Hash': block.hash,
  'No.Tx': block.transactions.length,
  BP: block.coinbase,
});

export default blockMapper;
