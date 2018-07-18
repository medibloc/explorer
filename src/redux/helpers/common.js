import axios from 'axios';

// eslint-disable-next-line
export const simpleRequester = (dispatch, {
  url,
  params = null,
  actionType,
  ERROR,
}) => new Promise((resolve, reject) => (
  axios({
    url,
    params,
  })
    .then((res) => {
      dispatch({
        type: actionType,
        payload: res.data,
      });
      return resolve(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
      return reject(err.message);
    })
));
