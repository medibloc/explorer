import React from 'react';

import Layout from './Layout';
import BlockList from '../container/BlockList';
import Navigation from '../container/Navigation';
import PageInfo from '../components/PageInfo';


const Blocks = () => (
  <Layout>
    <div className="blocks">
      <PageInfo title="block-list" />
      <div className="blocksContents">
        <BlockList />
      </div>
      <div className="blocksNavigation">
        <Navigation />
      </div>
    </div>
  </Layout>
);

export default Blocks;
