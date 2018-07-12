import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Account from './Account';
import Blocks from './Blocks';
import Block from './Block';
import BP from './BP';
import Home from './Home';
import Tx from './Tx';
import NavBar from '../container/NavBar';
import Footer from '../container/Footer';

import {
  GlobalActions,
  BlockchainActions,
  TickerActions,
} from '../redux/actionCreators';

const setWindowSize = () => {
  GlobalActions.setWindowSize(window.innerWidth);
  window.addEventListener(
    'resize',
    () => GlobalActions.setWindowSize(window.innerWidth),
  );
};

class Pages extends Component {
  componentWillMount() {
    BlockchainActions.getMedState();
  }

  componentDidMount() {
    setWindowSize();
    BlockchainActions.subscribe();
    TickerActions.getMedPrice();
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
                <Route exact path="/accounts" component={Account} />
                <Route path="/block" component={Block} />
                <Route exact path="/blocks" component={Blocks} />
                <Route exact path="/bp" component={BP} />
                <Route exact path="/txs" component={Tx} />
              </Switch>
            )
          }
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ widget }) => ({
  isFirstLoad: widget.isFirstLoad,
});

export default connect(mapStateToProps)(Pages);
