import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Account from './Account';
import Accounts from './Accounts';
import Blocks from './Blocks';
import Block from './Block';
import BP from './BP';
import Home from './Home';
import Tx from './Tx';
import Txs from './Txs';

import Footer from '../container/Footer';
import NavBar from '../container/NavBar';

import {
  GlobalActions,
  BlockchainActions,
  TickerActions,
  WidgetActions as w,
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
    w.loader(BlockchainActions.getMedState());
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
                <Route path="/account" component={Account} />
                <Route exact path="/accounts" component={Accounts} />
                <Route path="/block" component={Block} />
                <Route exact path="/blocks" component={Blocks} />
                <Route exact path="/bp" component={BP} />
                <Route exact path="/tx" component={Tx} />
                <Route exact path="/txs" component={Txs} />
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
