const blockMapper = (block) => {
  let amount = 0;
  block.transactions.forEach((tx) => {
    amount += parseInt(tx.value, 10);
  });
  return {
    'Block Height': block.height,
    'Time Stamp': block.timestamp,
    'Block Hash': block.hash,
    'Prev Hash': block.parent_hash,
    'No.Tx': block.transactions.length,
    BP: block.coinbase,
    Amount: amount,
  };
};

export default blockMapper;
