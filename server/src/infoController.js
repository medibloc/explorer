import axios from 'axios';

import config from '../config';

import Account from './account/model';
import Block from './block/model';
import Transaction from './transaction/model';

const { url } = config.blockchain;

export default async (req, res) => {
  const numAccount = await Account.count();
  const { height } = await Block.findOne({ order: [['id', 'DESC']] });
  const numTx = await Transaction.count();
  const { data: { candidates } } = await axios({
    method: 'get',
    url: `${url}/v1/candidates`,
  });

  res.json({
    height, numAccount, numCandidate: candidates.length, numTx,
  });
};
