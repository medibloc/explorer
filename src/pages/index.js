import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Account from './Account';
import Block from './Block';
import BP from './BP';
import Home from './Home';
import Tx from './Tx';
import NavBar from '../container/NavBar';

class Pages extends Component {
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
