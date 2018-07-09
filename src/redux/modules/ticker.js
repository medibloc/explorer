import { handleActions } from 'redux-actions';

import {
  medPriceGetter,
  medxPriceGetter,
} from '../helpers/ticker';


// ACTION TYPES
const GET_MED_PRICE = 'ticker/GET_MED_PRICE';
const GET_MEDX_PRICE = 'ticker/GET_MEDX_PRICE';

const ERROR = 'blockchain/ERROR';


const initialState = {
  medPrice: 0,
  medxPrice: 0,

  error: null,
};

// REDUCER
const reducer = handleActions({
  [GET_MED_PRICE]: (state, action) => {
    const medPrice = action.payload.data.quotes.USD.price;
    return { ...state, medPrice };
  },
  [GET_MEDX_PRICE]: (state, action) => {
    const medxPrice = action.payload.data.quotes.USD.price;
    return { ...state, medxPrice };
  },

  [ERROR]: (state, action) => ({ ...state, error: action.payload }),
}, initialState);


// ACTION CREATORS
export const getMedPrice = () => dispatch => medPriceGetter(dispatch, GET_MED_PRICE, ERROR);
export const getMedxPrice = () => dispatch => medxPriceGetter(dispatch, GET_MEDX_PRICE, ERROR);


export default reducer;
