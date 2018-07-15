import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../components/BlockWrapper';
import DetailWrapper from '../../components/DetailWrapper';
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

    const keyList = ['Block Height', 'Time', 'Block Hash', 'Prev Hash', 'Amount', 'No. Tx', 'BP'];
    const data = {
      'Block Height': 'this is the fake data',
      Time: 'this is the fake data',
      'Block Hash': 'this is the fake data',
      'Prev Hash': 'this is the fake data',
      Amount: 'this is the fake data',
      'No. Tx': 'this is the fake data',
      BP: 'this is the fake data',
    };

    return (
      <div>
        <DetailWrapper data={data} keyList={keyList} />
        {/*<div>
          <BlockWrapper>
            <div>
              Block Height
            </div>
            <div>
              {block.height}
            </div>
          </BlockWrapper>
          <BlockWrapper>
            <div>
              Time
            </div>
            <div>
              {block.timestamp}
            </div>
          </BlockWrapper>
          <BlockWrapper>
            <div>
              Block Hash
            </div>
            <div>
              {block.hash}
            </div>
          </BlockWrapper>
          <BlockWrapper>
            <div>
              Prev Hash
            </div>
            <div>
              {block.parent_hash}
            </div>
          </BlockWrapper>
          <BlockWrapper>
            <div>
              No. Tx
            </div>
            <div>
              {block.transactions.length}
            </div>
          </BlockWrapper>
          <BlockWrapper>
            <div>
              BP
            </div>
            <div>
              {block.coinbase}
            </div>
          </BlockWrapper>
        </div>
        <div>
          Transactions in the Block
          {
            block.transactions.map(tx => (
              <BlockWrapper>
                <div>
                  {tx.hash}
                </div>
                <div>
                  {tx.from}
                </div>
                <div>
                  {tx.to}
                </div>
                <div>
                  {tx.amount}
                </div>
              </BlockWrapper>
            ))
          }
        </div>*/}
      </div>
    );
  }
}

const mapStateToProps = ({ blockchain }) => ({
  block: blockchain.block,
  blockList: blockchain.blockList,
});

export default connect(mapStateToProps)(Block);
