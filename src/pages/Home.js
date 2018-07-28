import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import LiveBlocks from '../components/LiveBlocks';
import LiveInfoWrapper from '../components/LiveInfoWrapper';
import LiveTickerWrapper from '../components/LiveTickerWrapper';
import LiveTxs from '../components/LiveTxs';
import SearchBar from '../components/SearchBar';

import './pages.scss';


const Home = ({ intl }) => (
  <div className="homeContentWrapper">
    <div className="homeTokenInfo">
      <img className="bg" src="/image/icon/bg@3x.jpg" alt="bg" />
      <LiveTickerWrapper
        title={intl.formatMessage({ id: 'marketCap' })}
        value="123,456,789"
        suffix="USD"
      />
      <div className="verticalLine" />
      <LiveTickerWrapper
        title={intl.formatMessage({ id: 'medSupply' })}
        value="100,000,000"
        suffix="MED"
      />
    </div>
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
