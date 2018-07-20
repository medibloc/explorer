import React, { Component } from 'react';

import DetailWrapper from '../DetailWrapper';
import { blockMapper } from '../../lib';
import { BlockchainActions, WidgetActions as w } from '../../redux/actionCreators';


const blockPicker = (pool, { hash, height }) => {
  let block = null;
  pool.forEach((bl) => {
    if (bl.hash === hash || bl.height === height) block = bl;
  });
  return block;
};

class Block extends Component {
  componentWillMount() {
    const {
      hash,
      height,
      blockList,
      blocks,
    } = this.props;
    let block = blockPicker(blockList, { hash, height });
    if (!block) block = blockPicker(blocks, { hash, height });

    if (!block) {
      let subject = null;
      if (height) subject = height;
      if (hash) subject = hash;
      if (subject === null) throw new Error('Invalid block info');

      w.loader(BlockchainActions
        .getBlock(subject)
        .then((bl) => {
          BlockchainActions.setTxs(bl.transactions);
        }));
    }
    if (block) {
      BlockchainActions.setBlock(block);
      BlockchainActions.setTxs(block.transactions);
    }
  }

  render() {
    const { block, loading } = this.props;

    return loading || !block ? (
      <div>
        LOADING
      </div>
    ) : (
      <DetailWrapper data={blockMapper(block)} type="block" />
    );
  }
}

export default Block;
