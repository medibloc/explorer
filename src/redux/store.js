import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './modules';


const logger = createLogger();

const store = createStore(
  reducers,
  /* eslint no-underscore-dangle: 0 */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger, thunk),
);

export default store;
