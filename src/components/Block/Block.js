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
  constructor(props) {
    super(props);
    this.callBlock = this.callBlock.bind(this);
  }

  componentDidMount() {
    this.callBlock();
  }

  shouldComponentUpdate(nextProps) {
    const { hash, height, block } = this.props;
    if (hash !== nextProps.hash || height !== nextProps.height) {
      this.callBlock(nextProps);
      return true;
    }
    if (block !== nextProps.block) {
      return true;
    }
    return false;
  }

  callBlock(nextProps) {
    let hash = '';
    let height = '';
    if (nextProps) {
      hash = nextProps.hash;
      height = nextProps.height;
    } else {
      hash = this.props.hash;
      height = this.props.height;
    }

    const { blockList } = this.props;
    const block = blockPicker(blockList, { hash, height });
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
    const { block } = this.props;
    return block && (
      <DetailWrapper data={blockMapper(block)} type="block" />
    );
  }
}

export default Block;
