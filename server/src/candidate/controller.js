import { BadRequest } from 'http-errors';

import Candidate from './model';
import { listQueryWithCount } from '../db/query';

export const get = async (req, res) => {
  const { id } = req.params;
  let candidate;
  if (+id) {
    candidate = await Candidate.findByPk(req.params.id);
  }
  if (!candidate) {
    candidate = await Candidate.findOne({ where: { address: id } });
  }
  if (!candidate) {
    candidate = await Candidate.findOne({ where: { consensusAddr: id } });
  }
  if (!candidate) {
    throw new BadRequest('candidate not found');
  }

  res.json({ candidate });
};

const searchColumns = [Candidate.tableAttributes.address];

export const list = async (req, res) => {
  const options = { ...req.query, order: [['votes', 'DESC'], ['id', 'DESC']] };
  const { data, pagination } = await listQueryWithCount(Candidate, options, searchColumns);
  res.json({ candidates: data, pagination });
};
