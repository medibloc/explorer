import { createAction, handleActions } from 'redux-actions';

import {
  accDetailGetter,
  accGetter,
  accsGetter,
  blockGetter,
  blocksGetter,
  bpsGetter,
  medStateGetter,
  subscriber,
  txGetter,
  txsGetter,
} from '../helpers/blockchain';
import { divider, sorter } from '../../lib';
import { bpsInPage, contentsInPage } from '../../config';


// ACTION TYPES
const GET_MED_STATE = 'blockchain/GET_MED_STATE';

const GET_ACCOUNT = 'blockchain/GET_ACCOUNT';
const GET_ACCOUNTS = 'blockchain/GET_ACCOUNTS';
const GET_ACCOUNT_DETAIL = 'blockchain/GET_ACCOUNT_DETAIL';

const GET_BLOCK = 'blockchain/GET_BLOCK';
const GET_BLOCKS = 'blockchain/GET_BLOCKS';
const GET_INITIAL_BLOCKS = 'blockchain/GET_INITIAL_BLOCKS';
const GET_TAIL_BLOCK = 'blockchain/GET_TAIL_BLOCK';

const GET_TX = 'blockchain/GET_TX';
const GET_TXS = 'blockchain/GET_TXS';
const SET_TXS = 'blockchain/SET_TXS';

const GET_BPS = 'blockchain/GET_BPS';

const SUBSCRIBE = 'blockchain/SUBSCRIBE';

const ERROR = 'blockchain/ERROR';

const subsribeTypes = {
  // GET_EXECUTED_TX,
  GET_TAIL_BLOCK,
  // GET_LIB,
  // GET_PENDING_TX,
  // GET_REVERT_BLOCK,
};

const initialState = {
  totalSupply: 10000000000,

  medState: null,

  account: null, // specific account
  accountList: Array(contentsInPage).fill({}), // accounts from rpc call

  block: null, // specific block
  blockList: Array(contentsInPage).fill({}), // blocks from rpc call
  blocks: [], // blocks from event subscriber
  tailBlock: null, // tail block from event subscriber

  txList: Array(contentsInPage).fill({}), // transaction list set from local
  txs: [], // executed txs from event subscriber
  txsFromBlock: [], // txs included in the specific block

  bpList: Array(bpsInPage).fill({}),

  subscribe: false,

  error: null,
};

// REDUCER
const reducer = handleActions({
  [GET_MED_STATE]: (state, action) => ({ ...state, medState: action.payload }),

  [GET_ACCOUNT]: (state, action) => {
    const account = {
      ...action.payload.account.data,
      totalTxs: action.payload.account.totalTxs,
    };
    return { ...state, account };
  },
  [GET_ACCOUNTS]: (state, action) => ({ ...state, accountList: sorter(action.payload.accounts, 'balance') }),
  [GET_ACCOUNT_DETAIL]: (state, action) => {
    const txs = [];
    action.payload.transactions.forEach(res => txs.push(res.data));
    return ({ ...state, txs: sorter(txs, 'timestamp') });
  },

  [GET_BLOCK]: (state, action) => ({ ...state, block: action.payload.blocks.data[0].data }),
  [GET_BLOCKS]: (state, action) => {
    const blockList = [];
    action.payload.blocks.data.forEach(res => blockList.push(res.data));
    return ({ ...state, blockList: sorter(blockList, 'height') });
  },
  [GET_INITIAL_BLOCKS]: (state, action) => {
    const blockList = [];
    action.payload.blocks.data.forEach(res => blockList.push(res.data));
    return {
      ...state,
      blocks: sorter(blockList, 'height'),
      totalSupply: divider(blockList[0].supply, [10 ** 12]),
    };
  },
  [GET_TAIL_BLOCK]: (state, action) => ({
    ...state,
    tailBlock: action.payload,
    totalSupply: divider(action.payload.supply, [10 ** 12]),
    blocks: sorter([...state.blocks, action.payload], 'height').slice(0, 5),
    txsFromBlock: action.payload.transactions ? (
      [...action.payload.transactions, ...state.txsFromBlock].slice(0, 5)
    ) : (
      state.txsFromBlock
    ),
  }),

  [GET_TX]: (state, action) => ({ ...state, tx: action.payload.transactions[0].data }),
  [GET_TXS]: (state, action) => {
    const txList = [];
    action.payload.transactions.forEach(res => txList.push(res.data));
    return ({ ...state, txList });
  },
  [SET_TXS]: (state, action) => ({
    ...state,
    txs: sorter(action.payload, 'timestamp'),
  }),

  [GET_BPS]: (state, action) => ({
    ...state,
    bpList: sorter(action.payload.candidates, 'votePower'),
  }),

  [SUBSCRIBE]: state => ({ ...state, subscribe: true }),

  [ERROR]: (state, action) => ({ ...state, error: action.payload }),
}, initialState);

// ACTION CREATORS
export const getAccount = address => dispatch => accGetter(dispatch, GET_ACCOUNT, ERROR, address);
export const getAccountDetail = ({ address, from, to }) => dispatch => accDetailGetter(
  dispatch,
  GET_ACCOUNT_DETAIL,
  ERROR,
  { address, from, to },
);
export const getAccounts = ({ from, to }) => dispatch => accsGetter(
  dispatch,
  GET_ACCOUNTS,
  ERROR,
  { from, to },
);
export const getBlock = hash => dispatch => blockGetter(dispatch, GET_BLOCK, ERROR, hash);
export const getBlocks = ({ from, to }) => dispatch => blocksGetter(
  dispatch,
  GET_BLOCKS,
  ERROR,
  { from, to },
);
export const getBPs = ({ from, to }) => dispatch => bpsGetter(
  dispatch,
  GET_BPS,
  ERROR,
  { from, to },
);
export const getInitialBlocks = ({ from, to }) => dispatch => blocksGetter(
  dispatch,
  GET_INITIAL_BLOCKS,
  ERROR,
  { from, to },
);
export const getMedState = () => dispatch => medStateGetter(dispatch, GET_MED_STATE, ERROR);
export const getTx = hash => dispatch => txGetter(dispatch, GET_TX, ERROR, hash);
export const getTxs = ({ from, to }) => dispatch => txsGetter(
  dispatch,
  GET_TXS,
  ERROR,
  { from, to },
);
export const setTxs = createAction(SET_TXS);
export const subscribe = () => dispatch => subscriber(dispatch, subsribeTypes, ERROR);

export default reducer;
