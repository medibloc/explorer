import React from 'react';

import Layout from './Layout';
import TxList from '../container/TxList';
import PageInfo from '../components/PageInfo';
import Navigation from '../container/Navigation';


const Txs = () => (
  <Layout>
    <div className="txs">
      <PageInfo title="transactions-list" />
      <div className="txsContents">
        <TxList />
      </div>
      {/*
      <div className="txsNavigation">
        <Navigation />
      </div>*/}
    </div>
  </Layout>
);

export default Txs;
