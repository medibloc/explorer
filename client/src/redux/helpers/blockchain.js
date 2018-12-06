import { simpleRequester } from './common';
import { NODE_ENDPOINT } from '../../config';


export const subscriber = (dispatch, actionTypes, ERROR) => {
  const source = new EventSource(`${NODE_ENDPOINT}/subscribe?topics=chain.newTailBlock`);
  source.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);
    dispatch({
      type: actionTypes.GET_TAIL_BLOCK,
      payload: data.data.data,
    });
  }, false);
  source.addEventListener('open', () => console.log('Connected to the server'), false);
  source.addEventListener('error', (e) => {
    if (e.readyState === EventSource.CLOSED) {
      dispatch({
        type: ERROR,
        payload: 'Connection lost',
      });
    } else {
      dispatch({
        type: ERROR,
        payload: 'Error occured while subscribing',
      });
    }
  }, false);
};

export const blockGetter = (dispatch, actionType, ERROR, hash) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/blocks/${hash}`,
  actionType,
  ERROR,
});

export const blocksGetter = (
  dispatch,
  actionType,
  ERROR,
  { from, to },
) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/blocks`,
  params: {
    from: from < 0 ? 0 : from,
    to,
  },
  actionType,
  ERROR,
});

export const accGetter = (dispatch, actionType, ERROR, address) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/accounts/${address}`,
  actionType,
  ERROR,
});

export const accDetailGetter = (
  dispatch,
  actionType,
  ERROR,
  { address, from, to },
) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/transactions`,
  params: { account: address, from, to },
  actionType,
  ERROR,
});

export const accsGetter = (
  dispatch,
  actionType,
  ERROR,
  { from, to },
) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/accounts`,
  params: { from, to },
  actionType,
  ERROR,
});

export const medStateGetter = (dispatch, actionType, ERROR) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/info`,
  actionType,
  ERROR,
});

export const txGetter = (dispatch, actionType, ERROR, hash) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/transactions?q=${hash}`,
  actionType,
  ERROR,
});

export const txsGetter = (
  dispatch,
  actionType,
  ERROR,
  { from, to },
) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/transactions`,
  params: { from, to },
  actionType,
  ERROR,
});

export const bpsGetter = (
  dispatch,
  actionType,
  ERROR,
  { from, to },
) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/candidates`,
  params: { from, to },
  actionType,
  ERROR,
});
