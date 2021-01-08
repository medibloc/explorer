import axios from 'axios';
import config from '../../config';
import {
  balanceConverter, blockConverter,
  txConverter, stakingConverter, totalSupplyConverter,
} from '../converter';
import BigNumber from 'bignumber.js';

const { TENDERMINT_URL, SERVER_URL, COINGECKO_URL } = config.BLOCKCHAIN;

const requestMedXPrice = () => axios({
  method: 'get',
  url: COINGECKO_URL,
}).then(({ data }) => data.market_data.current_price.usd);

const requestBlockByHeightInTendermint = height => axios({
  method: 'get',
  url: `${TENDERMINT_URL.http}/block?height=${height}`,
}).then(({ data }) => blockConverter(data.result));

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
}).then(({ data }) => data.txs.reduce((acc, tx) => [...acc, ...txConverter(tx)], []));

const requestAccountBalance = address => axios({
  method: 'get',
  url: `${SERVER_URL.http}/bank/balances/${address}`,
}).then(({ data }) => balanceConverter(data.result));

const requestAccountStakingBalance = address => axios({
  method: 'get',
  url: `${SERVER_URL.http}/staking/delegators/${address}/delegations`,
}).then(({ data }) => stakingConverter(data.result));

const requestCandidates = () => axios({
  method: 'get',
  url: `${SERVER_URL.http}/staking/validators`,
}).then(({ data }) => data.result);

const requestMedState = () => axios({
  method: 'get',
  url: `${TENDERMINT_URL.http}/abci_info`,
}).then(res => res.data.result.response);

//const requestTotalSupply = () => axios({
//  method: 'get',
//  url: `${SERVER_URL.http}/supply/total`,
//}).then(res => totalSupplyConverter(res.data.result));

const requestTotalSupply = async () => {
	let res = await axios({
		method: 'get',
		url: `${SERVER_URL.http}/supply/total`,
	});
	const totalSupply = res.data.result[0].amount;

	res = await axios({
		method: 'get',
		url: `${SERVER_URL.http}/staking/pool`,
	});
	const bondedTokens = new BigNumber(res.data.result.bonded_tokens);
	const notBondedTokens = new BigNumber(totalSupply) - bondedTokens;
	return { totalSupply, bondedTokens, notBondedTokens };
}

const requestGenesis = () => axios({
  method: 'get',
  url: `${TENDERMINT_URL.http}/genesis`,
}).then(res => res.data.result.genesis);

export {
  requestMedXPrice,
  requestBlockByHeightInTendermint,
  requestBlockByHeight,
  requestTransactionsByHeight,
  requestAccountBalance,
  requestAccountStakingBalance,
  requestCandidates,
  requestMedState,
  requestTotalSupply,
  requestGenesis,
};
