import { simpleRequester } from './common';
import {
  COINMARKETCAP_MED_PRICE,
  COINMARKETCAP_MEDX_PRICE,
} from '../../config';


export const medPriceGetter = (dispatch, actionType, ERROR) => simpleRequester(dispatch, {
  url: COINMARKETCAP_MED_PRICE,
  actionType,
  ERROR,
});

export const medxPriceGetter = (dispatch, actionType, ERROR) => simpleRequester(dispatch, {
  url: COINMARKETCAP_MEDX_PRICE,
  actionType,
  ERROR,
});
