import axios from 'axios';

// export const simpleRequester = (dispatch, {
//   url,
//   params = null,
//   actionType,
//   ERROR,
// }, load = true) => {
//   if (load) dispatch({ type: LOAD });
//   axios({
//     url,
//     params,
//   })
//     .then((res) => {
//       dispatch({
//         type: actionType,
//         payload: res.data,
//       });
//       if (load) dispatch({ type: LOAD_SUCCESS });
//     })
//     .catch((err) => {
//       dispatch({
//         type: ERROR,
//         payload: err.message,
//       });
//       if (load) dispatch({ type: LOAD_FAIL, payload: err.message });
//     });
// };

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
