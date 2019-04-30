import axios from 'axios';
import config from '../../config';

const { URL } = config.BLOCKCHAIN;


const requestBlockByHash = hash => axios({
  method: 'get',
  params: { hash },
  url: `${URL}/v1/block`,
}).then(res => res.data);

const requestBlockByHeight = height => axios({
  method: 'get',
  params: { height },
  url: `${URL}/v1/block`,
}).then(res => res.data);

const requestBlocks = ({ from, to }) => axios({
  method: 'get',
  params: { from, to },
  url: `${URL}/v1/blocks`,
}).then(res => res.data.blocks);

const requestTransaction = hash => axios({
  method: 'get',
  params: { hash },
  url: `${URL}/v1/transaction`,
}).then(res => res.data);

const requestAccount = ({ address, height }) => axios({
  method: 'get',
  params: { address, height },
  url: `${URL}/v1/account`,
}).then(res => res.data);

// eslint-disable-next-line camelcase
const requestCandidate = candidate_id => axios({
  method: 'get',
  params: { candidate_id },
  url: `${URL}/v1/candidate`,
}).then(res => res.data);

const requestCandidates = () => axios({
  method: 'get',
  url: `${URL}/v1/candidates`,
}).then(res => res.data.candidates);

const requestMedState = () => axios({
  method: 'get',
  url: `${URL}/v1/node/medstate`,
}).then(res => res.data);

export {
  requestBlockByHash,
  requestBlockByHeight,
  requestBlocks,
  requestTransaction,
  requestAccount,
  requestCandidate,
  requestCandidates,
  requestMedState,
};
