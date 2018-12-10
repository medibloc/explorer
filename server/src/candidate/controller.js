import BigNumber from 'bignumber.js';
import { BadRequest } from 'http-errors';
import { keyBy } from 'lodash';
import { Op } from 'sequelize';

import Account from '../account/model';
import { toPagination } from '../db/query';

import { requestCandidate, requestCandidates } from '../utils/requester';

export const get = async (req, res) => {
  const { id } = req.params;
  if (id.length !== 64) {
    throw new BadRequest('candidate id is not valid');
  }

  const candidate = await requestCandidate(id);
  res.json({ candidate });
};

export const list = async (req, res) => { // eslint-disable-line import/prefer-default-export
  let candidates = await requestCandidates();
  candidates.sort((c1, c2) => {
    const diff = new BigNumber(c1.vote_power).minus(new BigNumber(c2.vote_power));
    if (diff.isNegative()) return 1;
    if (diff.isPositive()) return -1;
    return 0;
  });
  const { offset, limit } = toPagination(req.query);
  candidates = candidates.slice(offset, offset + limit);
  if (!candidates.length) {
    res.json({ candidates });
    return;
  }

  const candidateIds = candidates.reduce(
    (accumulator, candidate) => [...accumulator, candidate.candidate_id],
    [],
  );

  const accounts = await Account.findAll({
    where: { candidateId: { [Op.in]: candidateIds } },
  });
  const accountMap = keyBy(accounts, 'candidateId');
  candidates.forEach((candidate) => {
    // eslint-disable-next-line no-param-reassign
    candidate.alias = accountMap[candidate.candidate_id].alias;
  });
  res.json({ candidates });
};
