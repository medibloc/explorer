import { createStore } from 'redux';
import reducers from './modules';


const store = createStore(
  reducers,
  /* eslint no-underscore-dangle: 0 */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
