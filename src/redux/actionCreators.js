import { bindActionCreators } from 'redux';

import * as blockchainActions from './modules/blockchain';
import * as globalActions from './modules/global';
import * as tickerActions from './modules/ticker';
import * as widgetActions from './modules/widget';
import store from './store';


const { dispatch } = store;

const BlockchainActions = bindActionCreators(blockchainActions, dispatch);
const GlobalActions = bindActionCreators(globalActions, dispatch);
const TickerActions = bindActionCreators(tickerActions, dispatch);
const WidgetActions = bindActionCreators(widgetActions, dispatch);

export {
  BlockchainActions,
  GlobalActions,
  TickerActions,
  WidgetActions,
};
