import React from 'react';

import LiveBlocks from '../components/LiveBlocks';
import LiveTxs from '../components/LiveTxs';
import SearchBar from '../components/SearchBar';
import LiveInfoWrapper from '../components/LiveInfoWrapper';
import LiveTickerWrapper from '../components/LiveTickerWrapper';

import './pages.scss';

import Modal from '../components/Modal';
const Home = () => (
  <div className="homeContentWrapper">
    <Modal />
    <div className="homeTokenInfo">
      <LiveTickerWrapper
        title="Market Cap"
        value="123,456,789"
        suffix="USD"
      />
      <div className="verticalLine" />
      <LiveTickerWrapper
        title="Med Supply"
        value="100,000,000"
        suffix="MED"
      />
    </div>
    <div className="homeSearchBar">
      <hr />
      <SearchBar type="main" />
    </div>
    <div className="homeLive">
      <LiveInfoWrapper title="Recent Block">
        <LiveBlocks />
      </LiveInfoWrapper>
      <div className="verticalLine" />
      <LiveInfoWrapper title="Recent Transaction">
        <LiveTxs />
      </LiveInfoWrapper>
    </div>
  </div>
);

export default Home;
