import axios from 'axios';


export const simpleRequester = (dispatch, {
  url,
  params = null,
  actionType,
  ERROR,
}) => {
  axios({
    url,
    params,
  })
    .then(res => dispatch({
      type: actionType,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: ERROR,
      payload: err.message,
    }));
};
