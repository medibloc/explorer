import { handleActions } from 'redux-actions';

import { medxPriceGetter } from '../helpers/ticker';


// ACTION TYPES
const GET_MEDX_PRICE = 'ticker/GET_MEDX_PRICE';

const ERROR = 'ticker/ERROR';

const initialState = {
  medxPrice: 0,

  error: null,
};

// REDUCER
const reducer = handleActions({
  [GET_MEDX_PRICE]: (state, action) => {
    const medxPrice = action.payload.price;
    return { ...state, medxPrice };
  },

  [ERROR]: (state, action) => ({ ...state, error: action.payload }),
}, initialState);

// ACTION CREATORS
export const getMedxPrice = () => dispatch => medxPriceGetter(dispatch, GET_MEDX_PRICE, ERROR);

export default reducer;
