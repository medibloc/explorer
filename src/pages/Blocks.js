import React from 'react';
import BlockList from '../container/BlockList/BlockList';

const Blocks = () => (
  <div className="blocks">
    <div className="blocksTitle">
      <img src="/image/icon/ico-block.svg" alt="blocks" />
      Block List
    </div>
    <h2>
      Blocks
      <BlockList />
    </h2>
  </div>
);

export default Blocks;
