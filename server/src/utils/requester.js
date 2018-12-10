import axios from 'axios';
import config from '../../config';

const { url } = config.blockchain;

const requestBlockByHeight = height => axios({
  method: 'get',
  params: { height },
  url: `${url}/v1/block`,
}).then(res => res.data);

const requestBlocks = ({ from, to }) => axios({
  method: 'get',
  params: { from, to },
  url: `${url}/v1/blocks`,
}).then(res => res.data.blocks);

const requestTransaction = hash => axios({
  method: 'get',
  params: { hash },
  url: `${url}/v1/transaction`,
}).then(res => res.data);

const requestAccount = ({ address, height }) => axios({
  method: 'get',
  params: { address, height },
  url: `${url}/v1/account`,
}).then(res => res.data);

// eslint-disable-next-line camelcase
const requestCandidate = candidate_id => axios({
  method: 'get',
  params: { candidate_id },
  url: `${url}/v1/candidate`,
}).then(res => res.data);

const requestCandidates = () => axios({
  method: 'get',
  url: `${url}/v1/candidates`,
}).then(res => res.data.candidates);

export {
  requestBlockByHeight,
  requestBlocks,
  requestTransaction,
  requestAccount,
  requestCandidate,
  requestCandidates,
};
