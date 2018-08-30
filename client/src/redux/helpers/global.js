import { simpleRequester } from './common';
import { NODE_ENDPOINT } from '../../config';


export const searcher = (dispatch, actionType, ERROR, query) => {
  simpleRequester(dispatch, {
    url: `${NODE_ENDPOINT}/blocks?q=${query}&limit=5`,
    actionType,
    ERROR,
  });
  simpleRequester(dispatch, {
    url: `${NODE_ENDPOINT}/accounts?q=${query}&limit=5`,
    actionType,
    ERROR,
  });
  simpleRequester(dispatch, {
    url: `${NODE_ENDPOINT}/transactions?q=${query}&limit=5`,
    actionType,
    ERROR,
  });
};

export const searchTextSetter = (dispatch, actionType, ERROR, query) => {
  dispatch({
    type: actionType,
    payload: query,
  });
};

export const searchWorker = (result) => {
  const netResult = [];
  if ('blocks' in result) {
    result.blocks.data.forEach(block => netResult.push(block.data));
  } else if ('transactions' in result) {
    result.transactions.forEach(tx => netResult.push(tx.data));
  } else if ('accounts' in result) {
    result.accounts.forEach(acc => netResult.push(acc.data));
  }
  return netResult;
};
