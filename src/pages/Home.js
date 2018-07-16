import React from 'react';

import Layout from './Layout';
import Blocks from '../container/Blocks';
import Txs from '../container/Txs/Txs';
import SearchBar from '../container/SearchBar';
import LiveInfoWrapper from '../components/LiveInfoWrapper';
import LiveTickerWrapper from '../components/LiveTickerWrapper';

import './pages.scss';


const Home = () => (
  <Layout>
    <div className="home">
      <div className="homeContentWrapper">
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
            <Blocks />
          </LiveInfoWrapper>
          <div className="verticalLine" />
          <LiveInfoWrapper title="Recent Transaction">
            <Txs />
          </LiveInfoWrapper>
        </div>
      </div>
    </div>
  </Layout>
);

export default Home;
