import React, { Fragment } from 'react';

import TxList from '../components/TxList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const Txs = () => (
  <Fragment>
    <PageInfo title="transactions-list" />
    <div className="txsContents">
      <TxList type="tx" />
    </div>
    <div className="txsNavigation">
      <Navigation type="txs" />
    </div>
  </Fragment>
);

export default Txs;
