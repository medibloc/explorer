import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  accGetter,
  blockGetter,
  medStateGetter,
  subscriber,
  txGetter,
} from '../helpers/blockchain';


// ACTION TYPES
const GET_MED_STATE = 'blockchain/GET_MED_STATE';

const GET_ACCOUNT = 'blockchain/GET_ACCOUNT';

const GET_BLOCK = 'blockchain/GET_BLOCK';
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

const initialState = fromJS({
  medState: null,

  account: null,

  block: null,
  blocks: [],
  lib: null,
  revertBlocks: [],
  tailBlock: null,

  tx: null,
  txs: [],
  pendingTxs: [],

  subscribe: false,

  error: null,
});

// REDUCER
const reducer = handleActions({
  [GET_MED_STATE]: (state, action) => state.set('medState', action.payload),

  [GET_ACCOUNT]: (state, action) => state.set('account', action.payload),

  [GET_BLOCK]: (state, action) => state.set('block', action.payload),
  [GET_LIB]: (state, action) => state.set('lib', action.payload),
  [GET_REVERT_BLOCK]: (state, action) => state.update('revertBlocks', revertBlocks => revertBlocks.push(action.payload)),
  [GET_TAIL_BLOCK]: (state, action) => state.set('tailBlock', action.payload).update('blocks', blocks => blocks.push(action.payload)),

  [GET_EXECUTED_TX]: (state, action) => state.update('txs', txs => txs.push(action.payload)),
  [GET_PENDING_TX]: (state, action) => state.update('pendingTxs', pendingTxs => pendingTxs.push(action.payload)),
  [GET_TX]: (state, action) => state.set('tx', action.payload),

  [SUBSCRIBE]: state => state.set('subscribe', true),

  [ERROR]: (state, action) => state.set('error', action.payload),
}, initialState);


// ACTION CREATORS
export const getAccount = address => dispatch => accGetter(dispatch, GET_ACCOUNT, ERROR, address);
export const getBlock = hash => dispatch => blockGetter(dispatch, GET_BLOCK, ERROR, hash);
export const getMedState = () => dispatch => medStateGetter(dispatch, GET_MED_STATE, ERROR);
export const getTx = hash => dispatch => txGetter(dispatch, GET_TX, ERROR, hash);
export const subscribe = () => dispatch => subscriber(dispatch, subsribeTypes, ERROR);


export default reducer;
