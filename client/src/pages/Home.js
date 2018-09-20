import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import LiveBlocks from '../components/LiveBlocks';
import LiveInfoWrapper from '../components/LiveInfoWrapper';
import LiveTxs from '../components/LiveTxs';
import SearchBar from '../components/SearchBar';
import TokenInfo from '../components/TokenInfo';

import './pages.scss';


const Home = ({ intl }) => (
  <div className="homeContentWrapper">
    <TokenInfo />
    <div className="homeSearchBar">
      <div className="blur" />
      <hr />
      <SearchBar type="main" />
    </div>
    <div className="homeLive">
      <LiveInfoWrapper title={intl.formatMessage({ id: 'recentBlock' })} type="block">
        <LiveBlocks />
      </LiveInfoWrapper>
      <div className="verticalLine" />
      <LiveInfoWrapper title={intl.formatMessage({ id: 'recentTx' })} type="tx">
        <LiveTxs />
      </LiveInfoWrapper>
    </div>
  </div>
);

Home.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Home);
