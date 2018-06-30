import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  About,
  Block,
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
          <Route exact path="/about" component={About} />
          <Route exact path="/block" component={Block} />
          <Route exact path="/tx" component={Tx} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
