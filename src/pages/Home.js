import React from 'react';
import Blocks from '../container/Blocks';
// import Txs from '../container/Txs/Txs';

import SearchBar from '../container/SearchBar';
import LiveInfoWrapper from '../components/LiveInfoWrapper';
import ContentWrapper from '../components/ContentWrapper';


import './pages.scss';

const test = {
  height: 10,
  BlockHash: 'asdjkjsaefnrdjksfngjksedfngkjsdfngkjsdnfjkgnkjser',
  TimeStamp: 123456789,
  BP: 'HELLO',
};

const Home = () => (
  <div className="home">
    <div className="homeContentWrapper">
      <div className="homeTokenInfo">
        <div>
          <span className="homeTokenInfoTitle">
            Market Cap
          </span>
          <div className="homeInfoValue">
            <span>
              123,456,789
            </span>
            USD
          </div>
        </div>
        <div className="verticalLine" />
        <div>
          <span className="homeTokenInfoTitle">
            Med Supply
          </span>
          <div className="homeInfoValue">
            <span>
              100,000,000
            </span>
            MED
          </div>
        </div>
      </div>
      <div className="homeSearchBar">
        <hr />
        <SearchBar type="main" />
      </div>
      <LiveInfoWrapper title="Recent Block">
        {/*<Blocks />*/}
      </LiveInfoWrapper>
    </div>
    <ContentWrapper type="block" data={test} />
  </div>
);

export default Home;
