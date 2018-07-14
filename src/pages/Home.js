import React from 'react';
// import Blocks from '../container/Blocks';
// import Txs from '../container/Txs/Txs';

import SearchBar from '../container/SearchBar';

import './pages.scss';


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
      {/*<div>
        <Blocks />
        <Blocks />
      </div>*/}
    </div>
  </div>
);

export default Home;
