import timeConverter from './timeConverter';

const blockMapper = (block) => {
  let amount = 0;
  if (block.transactions) {
    block.transactions.forEach((tx) => {
      amount += parseInt(tx.value, 10);
    });
  } else {
    // eslint-disable-next-line
    block.transactions = [];
  }

  return {
    'Block Height': block.height,
    'Time Stamp': timeConverter(block.timestamp),
    'Block Hash': block.hash,
    'Prev Hash': block.parent_hash,
    'No.Tx': block.transactions.length,
    BP: block.coinbase,
    Amount: `${amount.toLocaleString()} MED`,
  };
};

export default blockMapper;
