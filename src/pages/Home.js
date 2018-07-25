import React from 'react';

import LiveBlocks from '../components/LiveBlocks';
import LiveTxs from '../components/LiveTxs';
import SearchBar from '../components/SearchBar';
import LiveInfoWrapper from '../components/LiveInfoWrapper';
import LiveTickerWrapper from '../components/LiveTickerWrapper';

import './pages.scss';


const Home = () => (
  <div className="homeContentWrapper">
    <div className="homeTokenInfo">
      <LiveTickerWrapper
        title="Market Cap"
        value="123,456,789"
        suffix="USD"
      />
      <div className="verticalLine" />
      <LiveTickerWrapper
        title="MED Supply"
        value="100,000,000"
        suffix="MED"
      />
    </div>
    <div className="homeSearchBar">
      <hr />
      <SearchBar type="main" />
    </div>
    <div className="homeLive">
      <LiveInfoWrapper title="Recent Blocks" type="block">
        <LiveBlocks />
      </LiveInfoWrapper>
      <div className="verticalLine" />
      <LiveInfoWrapper title="Recent Transactions" type="tx">
        <LiveTxs />
      </LiveInfoWrapper>
    </div>
  </div>
);

export default Home;
