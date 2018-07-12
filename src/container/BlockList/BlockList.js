import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../components/BlockWrapper';
import { BlockchainActions, GlobalActions } from '../../redux/actionCreators';
import { blocksInPage } from '../../config';


class BlockList extends Component {
  constructor(props) {
    super(props);
    this.getBlocks = this.getBlocks.bind(this);
    this.movePage = this.movePage.bind(this);
  }

  componentWillMount() {
    this.getBlocks();
  }

  componentWillReceiveProps(nextProps) {
    const { page } = this.props;
    if (page !== nextProps.page) this.getBlocks();
  }

  getBlocks() {
    const { page, medState: { height } } = this.props;
    BlockchainActions.getBlocks({
      from: height - page * blocksInPage + 1,
      to: height - (page - 1) * blocksInPage,
    });
  }

  movePage() {
    const { page } = this.props;
    GlobalActions.movePage(page + 1);
  }

  render() {
    const { blockList, loading } = this.props;
    return loading ? (
      <div>
        LOADING
      </div>
    ) : (
      <div>
        BLOCK LIST
        {
          blockList.map(block => (
            <BlockWrapper key={block.height}>
              <div>{block.height}</div>
              <div>{block.timestamp}</div>
              <div>{block.hash}</div>
              <div>{block.transactions.length}</div>
              <div>{block.coinbase}</div>
            </BlockWrapper>
          ))
        }
        <button onClick={this.movePage} type="button">
          NEXT PAGE
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ blockchain, global, widget }) => ({
  blockList: blockchain.blockList,
  medState: blockchain.medState,

  loading: widget.loading,

  page: global.page,
});

export default connect(mapStateToProps)(BlockList);
