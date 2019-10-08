import { Router } from 'express';
import BigNumber from 'bignumber.js';

import Account from './account/model';
import Block from './block/model';
import Transaction from './transaction/model';
import Candidate from './candidate/model';
import config from '../config';
import wrap from './utils/controller';

const { MEM_FIELDS } = config.BLOCKCHAIN;

const info = async (req, res) => {
  const numAccount = await Account.count();
  const { height } = await Block.findOne({ order: [['id', 'DESC']] });
  const numTx = await Transaction.count();
  const numCandidate = await Candidate.count();

  res.json({
    height, numAccount, numCandidate, numTx, supply: MEM_FIELDS,
  });
};

const supply = async (req, res) => {
  const { notBondedTokens, bondedTokens } = MEM_FIELDS;
  const parsedNotBondedSupply = new BigNumber(notBondedTokens);
  const parsedBondedSupply = new BigNumber(bondedTokens);
  const totalSupply = parsedNotBondedSupply.plus(parsedBondedSupply).dividedBy(10 ** 8).toString();
  res.send(totalSupply);
};

const price = async (req, res) => res.json({ price: MEM_FIELDS.price });

export default Router()
  .get('/', wrap(info))
  .get('/supply', wrap(supply))
  .get('/price', wrap(price));
