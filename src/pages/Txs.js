import React from 'react';

import TxList from '../components/TxList';
import PageInfo from '../components/PageInfo';
// import Navigation from '../container/Navigation';


const Txs = () => (
  <div className="txs">
    <PageInfo title="transactions-list" />
    <div className="txsContents">
      <TxList

      />
    </div>
    {/*
    <div className="txsNavigation">
      <Navigation />
    </div>*/}
  </div>
);

export default Txs;
