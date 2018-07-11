import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BlockchainActions, GlobalActions } from '../../redux/actionCreators';
import { blocksInPage } from '../../config';


class BlockList extends Component {
  componentWillMount() {
    this.getBlocks();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.getBlocks();
    }
  }

  getBlocks = () => {
    const { blockList, page } = this.props;
    const { height} = this.props.medState;
    BlockchainActions.getBlocks({
      from: height - page * blocksInPage + 1,
      to: height - (page - 1) * blocksInPage,
    });
  }

  movePage = () => {
    const { page } = this.props;
    GlobalActions.movePage(page+1);
  }

  render() {
    return this.props.loading ? (
      <div>
        LOADING
      </div>
      ) : (
      <div>
        BLOCK LIST
        { this.props.blockList.map(block => (<div>{JSON.stringify(block)}</div>)) }
        <button onClick={this.movePage}>
        </button>
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
