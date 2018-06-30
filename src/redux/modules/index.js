import { combineReducers } from 'redux';

import widget from './widget';
import global from './global';

export default combineReducers({
  widget,
  global,
});
