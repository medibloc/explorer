import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailWrapper from '../../components/DetailWrapper';
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
    } = this.props;
    const block = blockPicker(blockList, { hash, height });
    if (!block) {
      let subject = null;
      if (height) subject = height;
      if (hash) subject = hash;
      if (subject === null) throw new Error("Invalid block info");
      w.loader(BlockchainActions
        .getBlock(subject)
        .then((bl) => {
          BlockchainActions.setTxs(bl.transactions);
        }));
    }
    if (block) {
      BlockchainActions.setBlock(block);
      BlockchainActions.setTxs(block.transactions);
    };
  }


  render() {
    const { block } = this.props;
    if (!block) {
      return <div>LOADING</div>;
    }

    const keyList = ['Block Height', 'Time Stamp', 'Block Hash', 'Prev Hash', 'Amount', 'No.Tx', 'BP'];

    return (
      <div>
        <DetailWrapper data={blockMapper(block)} keyList={keyList} />
      </div>
    );
  }
}

const mapStateToProps = ({ blockchain }) => ({
  block: blockchain.block,
  blockList: blockchain.blockList,
});

export default connect(mapStateToProps)(Block);
