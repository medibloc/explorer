import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Language Setting
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en'; // English
import ja from 'react-intl/locale-data/ja'; // Japanese
import ko from 'react-intl/locale-data/ko'; // Korean
import zh from 'react-intl/locale-data/zh'; // Chinese
import locale from '../locale';

import Account from './Account';
import Accounts from './Accounts';
import Block from './Block';
import Blocks from './Blocks';
import BP from './BP';
import Err404 from './Err404';
import Home from './Home';
import Layout from './Layout';
import Tx from './Tx';
import Txs from './Txs';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

import { countryList } from '../config';
import {
  BlockchainActions,
  GlobalActions,
  TickerActions,
  WidgetActions as w,
} from '../redux/actionCreators';

addLocaleData([...en, ...ja, ...ko, ...zh]);


const setWindowSize = () => {
  GlobalActions.setWindowSize(window.innerWidth);
  window.addEventListener(
    'resize',
    () => GlobalActions.setWindowSize(window.innerWidth),
  );
};

class Pages extends Component {
  componentWillMount() {
    w.loader(BlockchainActions
      .getMedState()
      .then(() => TickerActions.getMedxPrice())
      .then(() => BlockchainActions.getInitialBlocks({ from: 0, to: 4 })));
  }

  componentDidMount() {
    setWindowSize();
    BlockchainActions.subscribe();
  }

  render() {
    const { isFirstLoad, language, loading } = this.props;
    return (
      <IntlProvider
        locale={language}
        messages={locale[language]}
        textComponent={React.Fragment}
      >
        <BrowserRouter>
          <Fragment>
            <NavBar />
            {
              isFirstLoad ? (
                <div>
                  LOADING
                </div>
              ) : (
                <Switch>
                  <Layout loading={loading}>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/account" component={Account} />
                      <Route exact path="/accounts" component={Accounts} />
                      <Route path="/block" component={Block} />
                      <Route exact path="/blocks" component={Blocks} />
                      <Route exact path="/bps" component={BP} />
                      <Route path="/tx" component={Tx} />
                      <Route exact path="/txs" component={Txs} />
                      <Route path="*" component={Err404} />
                    </Switch>
                  </Layout>
                </Switch>
              )
            }
            <Footer />
          </Fragment>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

Pages.propTypes = {
  isFirstLoad: PropTypes.bool.isRequired,
  language: PropTypes.oneOf(countryList).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ global, widget }) => ({
  language: global.language,

  isFirstLoad: widget.isFirstLoad,
  loading: widget.loading,
});

export default connect(mapStateToProps)(Pages);
