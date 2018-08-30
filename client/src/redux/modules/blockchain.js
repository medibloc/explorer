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
import { simpleRequester } from '../helpers/common';
import { sorter } from '../../lib';


// ACTION TYPES
const GET_MED_STATE = 'blockchain/GET_MED_STATE';

const GET_ACCOUNT = 'blockchain/GET_ACCOUNT';
const GET_ACCOUNTS = 'blockchain/GET_ACCOUNTS';
const GET_ACCOUNT_DETAIL = 'blockchain/GET_ACCOUNT_DETAIL';
const SET_ACCOUNT = 'blockchain/SET_ACCOUNT';

const GET_BLOCK = 'blockchain/GET_BLOCK';
const GET_BLOCKS = 'blockchain/GET_BLOCKS';
const GET_INITIAL_BLOCKS = 'blockchain/GET_INITIAL_BLOCKS';
const GET_LIB = 'blockchain/GET_LIB';
const GET_REVERT_BLOCK = 'blockchain/GET_REVERT_BLOCK';
const GET_TAIL_BLOCK = 'blockchain/GET_TAIL_BLOCK';
const SET_BLOCK = 'blockchain/SET_BLOCK';

const GET_EXECUTED_TX = 'blockchain/GET_EXECUTED_TX';
const GET_PENDING_TX = 'blockchain/GET_PENDING_TX';
const GET_TX = 'blockchain/GET_TX';
const GET_TXS = 'blockchain/GET_TXS';
const SET_TX = 'blockchain/SET_TX';
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
  accounts: [], // all accounts on the blockchain
  accountList: [], // accounts from rpc call

  block: null, // specific block
  blockList: [], // blocks from rpc call
  blocks: [], // blocks from event subscriber
  lib: null, // lib from event subscriber
  revertBlocks: [], // revert blocks from event subscriber
  tailBlock: null, // tail block from event subscriber

  pendingTxs: [], // pending txs from event subscriber
  tx: null, // specific tx
  txList: [], // transaction list set from local
  txs: [], // executed txs from event subscriber
  txsFromBlock: [], // txs included in the specific block

  bpList: [],

  subscribe: false,

  error: null,
};

// REDUCER
const reducer = handleActions({
  [GET_MED_STATE]: (state, action) => ({ ...state, medState: action.payload }),

  [GET_ACCOUNT]: (state, action) => ({ ...state, account: action.payload.account.data }),
  [GET_ACCOUNTS]: (state, action) => {
    const accList = [];
    action.payload.accounts.forEach(res => accList.push(res.data));
    return ({ ...state, accountList: sorter(accList, 'balance') });
  },
  [GET_ACCOUNT_DETAIL]: (state, action) => ({ ...state, txList: sorter(action.payload.transactions, 'timestamp') }),
  [SET_ACCOUNT]: (state, action) => ({ ...state, account: action.payload }),

  [GET_BLOCK]: (state, action) => ({ ...state, block: action.payload.blocks.data[0].data }),
  [GET_BLOCKS]: (state, action) => {
    const blockList = [];
    action.payload.blocks.data.forEach(res => blockList.push(res.data));
    return ({ ...state, blockList: sorter(blockList, 'height') });
  },
  [GET_INITIAL_BLOCKS]: (state, action) => ({
    ...state,
    blocks: sorter([...state.blocks, ...action.payload.blocks], 'height').slice(0, 5),
  }),
  [GET_LIB]: (state, action) => ({ ...state, lib: action.payload }),
  [GET_REVERT_BLOCK]: (state, action) => ({
    ...state,
    revertBlocks: [...state.revertBlocks, action.payload],
  }),
  [GET_TAIL_BLOCK]: (state, action) => ({
    ...state,
    tailBlock: action.payload,
    blocks: sorter([...state.blocks, action.payload], 'height').slice(0, 5),
    txsFromBlock: action.payload.transactions ? (
      [...action.payload.transactions, ...state.txsFromBlock].slice(0, 5)
    ) : (
      state.txsFromBlock
    ),
  }),
  [SET_BLOCK]: (state, action) => ({ ...state, block: action.payload }),

  [GET_EXECUTED_TX]: (state, action) => ({
    ...state,
    // txs: sorter([...state.txs, action.payload].slice(0, 5), 'timestamp'),
    txs: sorter([...state.txs, action.payload], 'timestamp'),
  }),
  [GET_PENDING_TX]: (state, action) => ({
    ...state,
    pendingTxs: [...state.pendingTxs, action.payload],
  }),
  [GET_TX]: (state, action) => ({ ...state, tx: action.payload.transactions[0].data }),
  [GET_TXS]: (state, action) => {
    const txList = [];
    action.payload.transactions.forEach(res => txList.push(res.data));
    return ({ ...state, txList });
  },
  [SET_TX]: (state, action) => ({ ...state, tx: action.payload }),
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
export const getAccountDetail = address => dispatch => accDetailGetter(
  dispatch,
  GET_ACCOUNT_DETAIL,
  ERROR,
  address,
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
export const getBlocksFromServer = ({ from, to }) => dispatch => simpleRequester(dispatch, {
  actionType: GET_BLOCKS,
  ERROR,
  params: { from, to },
  url: '/api/v1/blocks',
});
export const getBPs = () => dispatch => bpsGetter(dispatch, GET_BPS, ERROR);
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
export const setAccount = createAction(SET_ACCOUNT);
export const setBlock = createAction(SET_BLOCK);
export const setTx = createAction(SET_TX);
export const setTxs = createAction(SET_TXS);
export const subscribe = () => dispatch => subscriber(dispatch, subsribeTypes, ERROR);

export default reducer;
