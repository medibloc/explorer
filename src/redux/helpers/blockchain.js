import {
  EXECUTED_TX,
  LIB,
  PENDING_TX,
  REVERT_BLOCK,
  TAIL_BLOCK,
} from '../const';
import { NODE_ENDPOINT } from '../../config';


const preProcess = (result, maxResponse) => {
  const data = result.split('\n');
  data.pop();
  let restart = false;

  if (data.length >= maxResponse) restart = true;
  return {
    datum: data.length !== 0 ? JSON.parse(data[data.length - 1]).result : null,
    restart,
  };
};

const distributor = (datum, actionTypes) => {
  switch (datum.topic) {
    case EXECUTED_TX:
      return {
        type: actionTypes.GET_EXECUTED_TX,
        payload: datum.data,
      };
    case LIB:
      return {
        type: actionTypes.GET_LIB,
        payload: datum.data,
      };
    case PENDING_TX:
      return {
        type: actionTypes.GET_PENDING_TX,
        payload: datum.data,
      };
    case REVERT_BLOCK:
      return {
        type: actionTypes.GET_REVERT_BLOCK,
        payload: datum.data,
      };
    case TAIL_BLOCK:
      return {
        type: actionTypes.GET_TAIL_BLOCK,
        payload: datum.data,
      };
    default:
      return null;
  }
};

export const subscriber = (dispatch, actionTypes) => {
  const req = new XMLHttpRequest();
  req.open('POST', `${NODE_ENDPOINT}/v1/subscribe`);
  req.onprogress = () => {
    const data = preProcess(req.responseText, 10);
    if (data.datum !== null) dispatch(distributor(data.datum, actionTypes));
    if (data.restart === true) {
      req.abort();
      return subscriber(dispatch, actionTypes);
    }
    return null;
  };
  req.send(JSON.stringify({
    topics: [
      EXECUTED_TX,
      LIB,
      PENDING_TX,
      REVERT_BLOCK,
      TAIL_BLOCK,
    ],
  }));
};
