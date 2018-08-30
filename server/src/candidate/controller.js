import BigNumber from 'bignumber.js';
import { keyBy } from 'lodash';
import { Op } from 'sequelize';

import Account from '../account/model';
import { toPagination } from '../db/query';

import { getCandidates } from '../blockchain/client';

export const get = async (req, res) => { // eslint-disable-line import/prefer-default-export
  let { data: { candidates } } = await getCandidates();
  candidates.sort((c1, c2) => {
    const diff = new BigNumber(c1.votePower).minus(new BigNumber(c2.votePower));
    if (diff.isNegative()) return -1;
    if (diff.isPositive()) return 1;
    return 0;
  });
  const { offset, limit } = toPagination(req.query);
  candidates = candidates.slice(offset, offset + limit);
  if (!candidates.length) {
    res.json({ candidates });
    return;
  }

  const accounts = await Account.findAll({
    where: { address: { [Op.in]: candidates.map(c => c.address) } },
  });
  const accountMap = keyBy(accounts, 'address');
  candidates.forEach((candidate) => {
    candidate.account = accountMap[candidate.address]; // eslint-disable-line no-param-reassign
  });

  res.json({ candidates });
};
