import Account from './account/model';
import Block from './block/model';
import Transaction from './transaction/model';
import Candidate from './candidate/model';
import config from '../config';

const { MEM_FIELDS } = config.BLOCKCHAIN;

export default async (req, res) => {
  const numAccount = await Account.count();
  const { height } = await Block.findOne({ order: [['id', 'DESC']] });
  const numTx = await Transaction.count();
  const numCandidate = await Candidate.count();
  const { totalSupply } = MEM_FIELDS;

  res.json({
    height, numAccount, numCandidate, numTx, totalSupply,
  });
};
