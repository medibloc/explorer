import React from 'react';

import BlockList from '../container/BlockList/BlockList';
import Navigation from '../container/Navigation';


const Blocks = () => (
  <div className="blocks">
    <div className="blocksTitle">
      <img src="/image/icon/ico-block.svg" alt="blocks" />
      Block List
    </div>
    <div className="blocksContents">
      <BlockList />
    </div>
    <div className="blocksNavigation">
      <Navigation />
    </div>
  </div>
);

export default Blocks;
