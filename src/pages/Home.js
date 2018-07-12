import React from 'react';
import Blocks from '../container/Blocks';
// import Txs from '../container/Txs/Txs';

import './pages.scss';


const Home = () => (
  <div className="home">
    <div className="homeContentWrapper">
      <Blocks />
      <Blocks />
    </div>
  </div>
);

export default Home;
