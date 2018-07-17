import React from 'react';

import Layout from './Layout';
import PageInfo from '../components/PageInfo';
import BlockContainer from '../container/Block';
import TxList from '../container/TxList';

// location.pathname => /block/hash/e1197cb1845600ff30fcff3cca3bb2e6dd084981a9c7c235d629379df55e1b28
const Block = ({ location }) => {
  const step = location.pathname.split('/');
  let BlockWrapper = null;
  if (step[2] === 'hash') {
    BlockWrapper = <BlockContainer hash={step[3]} />;
  } else if (step[2] === 'height') {
    BlockWrapper = <BlockContainer height={step[3]} />;
  } else {
    BlockWrapper = <BlockContainer />;
  }


  return (
    <Layout>
      <div className="block">
        <div className="blockDetail">
          <PageInfo title="block-detail-info" />
          { BlockWrapper }
        </div>
        <div className="blockDetailTx">
          <PageInfo title="transactions-in-the-block" />
          <TxList />
        </div>
      </div>
    </Layout>
  );
};

export default Block;
