import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../components/BlockWrapper';
import { BlockchainActions } from '../../redux/actionCreators';


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
    if (!block && hash) BlockchainActions.getBlock(hash);
    if (!block && height) BlockchainActions.getBlock(height);
    if (block) BlockchainActions.setBlock(block);
  }


  render() {
    const { block } = this.props;
    if (!block) {
      return <div>LOADING</div>;
    }
    return (
      <div>
        <div>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ blockchain }) => ({
  block: blockchain.block,
  blockList: blockchain.blockList,
});

export default connect(mapStateToProps)(Block);
