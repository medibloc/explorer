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

  const tempAmount = divider(amount, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  amount = `${tempAmount.join('.')} MED`;

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
