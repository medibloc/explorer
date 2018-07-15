import React from 'react';

import BlockList from '../container/BlockList/BlockList';
import Navigation from '../container/Navigation';
import PageInfo from '../components/PageInfo';


const Blocks = () => (
  <div className="blocks">
    <PageInfo title="block-list" />
    <div className="blocksContents">
      <BlockList />
    </div>
    <div className="blocksNavigation">
      <Navigation />
    </div>
  </div>
);

export default Blocks;
