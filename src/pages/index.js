import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Language Setting
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';
import locale from '../locale';

import Layout from './Layout';
import Account from './Account';
import Accounts from './Accounts';
import Blocks from './Blocks';
import Block from './Block';
import BP from './BP';
import Home from './Home';
import Tx from './Tx';
import Txs from './Txs';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

import {
  GlobalActions,
  BlockchainActions,
  TickerActions,
  WidgetActions as w,
} from '../redux/actionCreators';

addLocaleData([...en, ...ko, ...ja, ...zh]);


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
    const { isFirstLoad, language } = this.props;
    return (
      <BrowserRouter>
        <IntlProvider
          locale={language}
          messages={locale[language]}
          textComponent={React.Fragment}
        >
          <Fragment>
            <NavBar />
            {
              isFirstLoad ? (
                <div>
                  LOADING
                </div>
              ) : (
                <Switch>
                  <Layout>
                    <Route exact path="/" component={Home} />
                    <Route path="/account" component={Account} />
                    <Route exact path="/accounts" component={Accounts} />
                    <Route path="/block" component={Block} />
                    <Route exact path="/blocks" component={Blocks} />
                    <Route exact path="/bp" component={BP} />
                    <Route path="/tx" component={Tx} />
                    <Route exact path="/txs" component={Txs} />
                  </Layout>
                </Switch>
              )
            }
            <Footer />
          </Fragment>
        </IntlProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ global, widget }) => ({
  language: global.language,

  isFirstLoad: widget.isFirstLoad,
});

export default connect(mapStateToProps)(Pages);
