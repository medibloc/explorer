import axios from 'axios';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
} from '../modules/widget';


export const simpleRequester = (dispatch, {
  url,
  params = null,
  actionType,
  ERROR,
}) => {
  dispatch({ type: LOAD });
  axios({
    url,
    params,
  })
    .then((res) => {
      dispatch({
        type: actionType,
        payload: res.data,
      });
      dispatch({ type: LOAD_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
      dispatch({
        type: LOAD_FAIL,
        payload: err.message,
      });
    });
};
