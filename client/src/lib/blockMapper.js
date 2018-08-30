import { adder, divider } from './bigNumCalculator';

const blockMapper = (block) => {
  let amount = '0';
  if (block.transactions) {
    block.transactions.forEach((tx) => {
      amount = adder(amount, [tx.value]);
    });
  } else {
    // eslint-disable-next-line
    block.transactions = [];
  }

  return {
    'Block Height': block.height,
    'Time Stamp': block.timestamp,
    'Block Hash': block.hash,
    'Prev Hash': block.parent_hash,
    'No.Tx': block.transactions.length,
    BP: block.coinbase,
    Amount: `${divider(amount, [10 ** 12]).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} MED`,
  };
};

export default blockMapper;
