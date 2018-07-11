import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BlockchainActions } from '../../redux/actionCreators';

const blocksInPage = 10;

class BlockList extends Component {
  componentWillMount() {
    this.getBlocks();
  }

  getBlocks() {
    const { blockList, page } = this.props;
    const height = 10
    BlockchainActions.getBlocks({
      from: height - page * blocksInPage + 1,
      to: height - (page - 1) * blocksInPage,
    });
  }

  render() {
    return this.props.loading ? (
      <div>
        LOADING
      </div>
      ) : (
      <div>
        BLOCK LIST

      </div>
    );
  }
}

const mapStateToProps = ({ blockchain, global, widget }) => ({
  blockList: blockchain.blockList,
  medState: blockchain.medState,

  loading: widget.loading,
  // one page contains 10 blocks
  page: global.page,
});

export default connect(mapStateToProps)(BlockList);
