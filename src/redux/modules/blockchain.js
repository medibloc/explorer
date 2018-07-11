import arraySort from 'array-sort';
import { handleActions } from 'redux-actions';

import {
  accGetter,
  accsGetter,
  blockGetter,
  blocksGetter,
  medStateGetter,
  subscriber,
  txGetter,
} from '../helpers/blockchain';


// ACTION TYPES
const GET_MED_STATE = 'blockchain/GET_MED_STATE';

const GET_ACCOUNT = 'blockchain/GET_ACCOUNT';
const GET_ACCOUNTS = 'blockchain/GET_ACCOUNTS';

const GET_BLOCK = 'blockchain/GET_BLOCK';
const GET_BLOCKS = 'blockchain/GET_BLOCKS';
const GET_LIB = 'blockchain/GET_LIB';
const GET_REVERT_BLOCK = 'blockchain/GET_REVERT_BLOCK';
const GET_TAIL_BLOCK = 'blockchain/GET_TAIL_BLOCK';

const GET_EXECUTED_TX = 'blockchain/GET_EXECUTED_TX';
const GET_PENDING_TX = 'blockchain/GET_PENDING_TX';
const GET_TX = 'blockchain/GET_TX';

const SUBSCRIBE = 'blockchain/SUBSCRIBE';

const ERROR = 'blockchain/ERROR';


const subsribeTypes = {
  GET_EXECUTED_TX,
  GET_LIB,
  GET_PENDING_TX,
  GET_REVERT_BLOCK,
  GET_TAIL_BLOCK,
};

const initialState = {
  medState: null,

  account: null,
  accounts: [],

  block: null,
  blocks: [],
  blockList: [],
  lib: null,
  revertBlocks: [],
  tailBlock: null,

  tx: null,
  txs: [],
  pendingTxs: [],

  subscribe: false,

  error: null,
};

// REDUCER
const reducer = handleActions({
  [GET_MED_STATE]: (state, action) => ({ ...state, medState: action.payload }),

  [GET_ACCOUNT]: (state, action) => ({ ...state, account: action.payload }),
  [GET_ACCOUNTS]: (state, action) => ({ ...state, accounts: arraySort(action.payload.accounts, 'balance', { reverse: true }) }),

  [GET_BLOCK]: (state, action) => ({ ...state, block: action.payload }),
  [GET_BLOCKS]: (state, action) => ({ ...state, blockList: arraySort(action.payload.blocks, 'height', { reverse: true }) }),
  [GET_LIB]: (state, action) => ({ ...state, lib: action.payload }),
  [GET_REVERT_BLOCK]: (state, action) => ({
    ...state,
    revertBlocks: [...state.revertBlocks, action.payload],
  }),
  [GET_TAIL_BLOCK]: (state, action) => ({
    ...state,
    tailBlock: action.payload,
    blocks: [...state.blocks, action.payload],
  }),

  [GET_EXECUTED_TX]: (state, action) => ({ ...state, txs: [...state.txs, action.payload] }),
  [GET_PENDING_TX]: (state, action) => ({
    ...state,
    pendingTxs: [...state.pendingTxs, action.payload],
  }),
  [GET_TX]: (state, action) => ({ ...state, tx: action.payload }),

  [SUBSCRIBE]: state => ({ ...state, subscribe: true }),

  [ERROR]: (state, action) => ({ ...state, error: action.payload }),
}, initialState);


// ACTION CREATORS
export const getAccount = address => dispatch => accGetter(dispatch, GET_ACCOUNT, ERROR, address);
export const getAccounts = () => dispatch => accsGetter(dispatch, GET_ACCOUNTS, ERROR);
export const getBlock = hash => dispatch => blockGetter(dispatch, GET_BLOCK, ERROR, hash);
export const getBlocks = ({ from, to }) => dispatch => blocksGetter(
  dispatch,
  GET_BLOCKS,
  ERROR,
  { from, to },
);
export const getMedState = () => dispatch => medStateGetter(dispatch, GET_MED_STATE, ERROR);
export const getTx = hash => dispatch => txGetter(dispatch, GET_TX, ERROR, hash);
export const subscribe = () => dispatch => subscriber(dispatch, subsribeTypes, ERROR);


export default reducer;
