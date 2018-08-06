import React from 'react';
import { Provider } from 'react-redux';

import Pages from './pages';

import store from './redux/store';


const App = () => (
  <Provider store={store}>
    <Pages />
  </Provider>
);

export default App;
