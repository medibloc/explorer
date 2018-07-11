import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Account from './Account';
import Block from './Block';
import BP from './BP';
import Home from './Home';
import Tx from './Tx';
import NavBar from '../container/NavBar';

import {
  GlobalActions,
  BlockchainActions,
  TickerActions,
} from '../redux/actionCreators';

class Pages extends Component {
  componentWillMount() {
    BlockchainActions.getMedState();
  }

  componentDidMount() {
    this.setWindowSize();
    BlockchainActions.subscribe();
    TickerActions.getMedPrice();
  }

  setWindowSize() {
    GlobalActions.setWindowSize(window.innerWidth);
    window.addEventListener(
      'resize',
      () => GlobalActions.setWindowSize(window.innerWidth),
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          {
            this.props.isFirstLoad ? (
              <div>
                LOADING
              </div>
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/block" component={Block} />
                <Route exact path="/bp" component={BP} />
                <Route exact path="/tx" component={Tx} />
              </Switch>
            )
          }
        </Fragment>
      </BrowserRouter>
    )
  }
};

const mapStateToProps = ({ widget }) => ({
  isFirstLoad: widget.isFirstLoad,
});

export default connect(mapStateToProps)(Pages);
