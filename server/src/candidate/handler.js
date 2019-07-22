import { isEqual } from 'lodash';
import Candidate from './model';
import logger from '../logger';
import { requestCandidates } from '../utils/requester';
import { parseCandidate } from '../utils/parser';


const getCandidateFromDB = (address, t) => Candidate
  .findOrCreate({ where: { address }, transaction: t })
  .then(accounts => accounts[0]);

// eslint-disable-next-line import/prefer-default-export
export const updateCandidates = async (t) => {
  const data = await requestCandidates();

  const promises = data.map(async (d) => {
    const parsedCandidate = parseCandidate(d);
    const candidate = await getCandidateFromDB(parsedCandidate.address, t);
    if (isEqual(parsedCandidate, candidate)) return true; // No need to update

    delete parsedCandidate.address;
    return candidate.update({
      consensusPubKey: parsedCandidate.consensusPubKey,
      jailed: parsedCandidate.jailed,
      votes: parsedCandidate.votes,
      data: parsedCandidate.data,
    }, { transaction: t });
  });

  return Promise
    .all(promises)
    .catch((e) => {
      logger.error(`failed to update candidates ${e}`);
    });
};
