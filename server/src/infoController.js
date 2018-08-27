import Account from './account/model';
import Block from './block/model';
import Transaction from './transaction/model';

export default async (req, res) => {
  const numAccount = await Account.count();
  const { height } = await Block.findOne({ order: [['id', 'DESC']] });
  const numTx = await Transaction.count();
  res.json({ height, numAccount, numTx });
};
