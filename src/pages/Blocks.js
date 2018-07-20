import React, { Fragment } from 'react';

import BlockList from '../components/BlockList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const Blocks = () => (
  <Fragment>
    <PageInfo title="block-list" />
    <div className="blocksContents">
      <BlockList />
    </div>
    <div className="blocksNavigation">
      <Navigation type="block" />
    </div>
  </Fragment>
);

export default Blocks;
