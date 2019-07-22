import axios from 'axios';
import config from '../../config';
import {
  balanceConverter, blockConverter,
  txConverter, stakingConverter, totalSupplyConverter,
} from '../converter';

const { URL, TENDERMINT_URL, SERVER_URL } = config.BLOCKCHAIN;


const requestBlockByHeight = height => axios({
  method: 'get',
  url: `${SERVER_URL.http}/blocks/${height}`,
}).then(({ data }) => blockConverter(data));

const requestTransactionsByHeight = height => axios({
  method: 'get',
  params: {
    'tx.height': height,
  },
  url: `${SERVER_URL.http}/txs`,
}).then(({ data }) => data.reduce((acc, tx) => [...acc, ...txConverter(tx)], []));

const requestAccountBalance = address => axios({
  method: 'get',
  url: `${SERVER_URL.http}/bank/balances/${address}`,
}).then(({ data }) => balanceConverter(data));

const requestAccountStakingBalance = address => axios({
  method: 'get',
  url: `${SERVER_URL.http}/staking/delegators/${address}/delegations`,
}).then(({ data }) => stakingConverter(data));

// eslint-disable-next-line camelcase
const requestCandidate = candidate_id => axios({
  method: 'get',
  params: { candidate_id },
  url: `${URL}/v1/candidate`,
}).then(res => res.data);

const requestCandidates = () => axios({
  method: 'get',
  url: `${SERVER_URL.http}/validatorsets/latest`,
}).then(({ data }) => data.validators);

const requestMedState = () => axios({
  method: 'get',
  url: `${TENDERMINT_URL.http}/abci_info`,
}).then(res => res.data.result.response);

const requestTotalSupply = () => axios({
  method: 'get',
  url: `${SERVER_URL.http}/staking/pool`,
}).then(res => totalSupplyConverter(res.data));

export {
  requestBlockByHeight,
  requestTransactionsByHeight,
  requestAccountBalance,
  requestAccountStakingBalance,
  requestCandidate,
  requestCandidates,
  requestMedState,
  requestTotalSupply,
};
