import { combineReducers } from 'redux';

import blockchain from './blockchain';
import global from './global';
import widget from './widget';


export default combineReducers({
  blockchain,
  global,
  widget,
});
