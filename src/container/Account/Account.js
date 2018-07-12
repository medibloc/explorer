import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../components/BlockWrapper';
import { BlockchainActions } from '../../redux/actionCreators';


class Block extends Component {
  componentWillMount() {
    const { address } = this.props;
    console.log(address)
    if (address !== undefined) BlockchainActions.getAccount(address);
  }


  render() {
    const { account } = this.props;
    return account === null ? (
      <div>
        LOADING
      </div>
    ) : (
      <div>
        {JSON.stringify(account)}
        {/*<div>
          <BlockWrapper>
            <div>
              Account
            </div>
            <div>
              {account.address}
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
  account: blockchain.account,
});

export default connect(mapStateToProps)(Block);
