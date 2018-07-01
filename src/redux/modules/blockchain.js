import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { subscriber } from '../helpers/blockchain';


// ACTION TYPES
const GET_BLOCK = 'blockchain/GET_BLOCK';
const GET_EXECUTED_TX = 'blockchain/GET_EXECUTED_TX';
const GET_LIB = 'blockchain/GET_LIB';
const GET_PENDING_TX = 'blockchain/GET_PENDING_TX';
const GET_REVERT_BLOCK = 'blockchain/GET_REVERT_BLOCK';
const GET_TAIL_BLOCK = 'blockchain/GET_TAIL_BLOCK';
const SUBSCRIBE = 'blockchain/SUBSCRIBE';

const subsribeTypes = {
  GET_EXECUTED_TX,
  GET_LIB,
  GET_PENDING_TX,
  GET_REVERT_BLOCK,
  GET_TAIL_BLOCK,
};

const initialState = fromJS({
  block: null,
  blocks: [],
  lib: null,
  revertBlocks: [],
  tailBlock: null,

  txs: [],
  pendingTxs: [],

  subscribe: false,
});

// REDUCER
const reducer = handleActions({
  [GET_BLOCK]: (state, action) => state.set('block', action.payload),
  [GET_EXECUTED_TX]: (state, action) => state.update('txs', txs => txs.push(action.payload)),
  [GET_LIB]: (state, action) => state.set('lib', action.payload),
  [GET_PENDING_TX]: (state, action) => state.update('pendingTxs', pendingTxs => pendingTxs.push(action.payload)),
  [GET_REVERT_BLOCK]: (state, action) => state.update('revertBlocks', revertBlocks => revertBlocks.push(action.payload)),
  [GET_TAIL_BLOCK]: (state, action) => state.set('tailBlock', action.payload).update('blocks', blocks => blocks.push(action.payload)),
  [SUBSCRIBE]: state => state.set('subscribe', true),
}, initialState);


// ACTION CREATORS
export const subscribe = () => dispatch => subscriber(dispatch, subsribeTypes);


export default reducer;
