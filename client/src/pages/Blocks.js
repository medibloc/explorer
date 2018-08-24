import React, { Fragment } from 'react';

import BlockList from '../components/BlockList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const Blocks = props => (
  <Fragment>
    <PageInfo title="block-list" />
    <div className="blocksContents">
      <BlockList {...props} />
    </div>
    <div className="blocksNavigation">
      <Navigation type="blocks" />
    </div>
  </Fragment>
);

export default Blocks;
