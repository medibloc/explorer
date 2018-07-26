import axios from 'axios';


// eslint-disable-next-line
export const simpleRequester = (dispatch, {
  url,
  params = null,
  actionType,
  ERROR,
}) => axios({
  url,
  params,
})
  .then((res) => {
    dispatch({
      type: actionType,
      payload: res.data,
    });
    return res.data;
  })
  .catch((err) => {
    dispatch({
      type: ERROR,
      payload: err.message,
    });
    throw err.message;
  });
