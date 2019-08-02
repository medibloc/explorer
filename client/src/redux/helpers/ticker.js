import { simpleRequester } from './common';
import { NODE_ENDPOINT } from '../../config';


// eslint-disable-next-line import/prefer-default-export
export const medxPriceGetter = (dispatch, actionType, ERROR) => simpleRequester(dispatch, {
  url: `${NODE_ENDPOINT}/info/price`,
  actionType,
  ERROR,
});
