import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../components/BlockWrapper';
import { BlockchainActions } from '../../redux/actionCreators';


class Block extends Component {
  componentWillMount() {
    const { hash, height } = this.props;
    if (hash !== undefined) BlockchainActions.getBlock(hash);
    else if (height !== undefined) BlockchainActions.getBlock(height);
  }


  render() {
    const { block } = this.props;
    return block === null ? (
      <div>
        LOADING
      </div>
    ) : (
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
});

export default connect(mapStateToProps)(Block);
