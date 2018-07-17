import React from 'react';
import { connect } from 'react-redux';

import ContentWrapper from '../../components/ContentWrapper';
import { blockMapper } from '../../lib';

import './Blocks.scss';


const titles = ['Block Hash', 'Time Stamp', 'BP'];

const Blocks = ({ blocks, data }) => {
  let blockList = [];
  if (data) blockList = data;
  else blockList = blocks;

  return (
    <div className="blocks">
      {
        blockList.map((block, i) => (
          <ContentWrapper
            type="block"
            data={blockMapper(block)}
            titles={titles}
            key={i}
          />
        ))
      }
    </div>
  );
}

const mapStateToProps = ({ blockchain }) => ({
  blocks: blockchain.blocks,
});

export default connect(mapStateToProps)(Blocks);
