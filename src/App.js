import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  Account,
  Block,
  BP,
  Home,
  Tx,
} from './pages';
import NavBar from './container/NavBar';
import store from './redux/store';


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/block" component={Block} />
          <Route exact path="/bp" component={BP} />
          <Route exact path="/tx" component={Tx} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
