import { bindActionCreators } from 'redux';

import * as globalActions from './modules/global';
import * as widgetActions from './modules/widget';
import store from './store';


const { dispatch } = store;

const GlobalActions = bindActionCreators(globalActions, dispatch);
const WidgetActions = bindActionCreators(widgetActions, dispatch);

export {
  GlobalActions,
  WidgetActions,
};
