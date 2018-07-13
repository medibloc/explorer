import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import BlockWrapper from '../../components/BlockWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import { blocksInPage } from '../../config';

const blockRanger = (page, height) => {
  if (height < blocksInPage) return { from: 1, to: height };
  let from = height - page * blocksInPage + 1;
  let to = height - (page - 1) * blocksInPage;
  if (from < 1) from = 1;
  if (to < 1) to = 0;
  return { from, to };
};

class BlockList extends Component {
  constructor(props) {
    super(props);
    this.getBlocks = this.getBlocks.bind(this);
    this.moveToPrevPage = this.moveToPrevPage.bind(this);
    this.moveToNextPage = this.moveToNextPage.bind(this);
  }

  componentWillMount() {
    this.getBlocks();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (page !== prevProps.page) this.getBlocks();
  }

  getBlocks() {
    const { page, medState: { height } } = this.props;
    const { from, to } = blockRanger(page, height);
    w.loader(BlockchainActions.getBlocks({ from, to }));
  }

  moveToPrevPage() {
    const { page } = this.props;
    GlobalActions.movePage(page - 1);
  }

  moveToNextPage() {
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
              <div>
                <NavLink to={'/block?height=' + block.height}>
                  {block.height}
                </NavLink>
              </div>
              <div>{block.timestamp}</div>
              <div>{block.hash}</div>
              <div>{block.transactions.length}</div>
              <div>{block.coinbase}</div>
            </BlockWrapper>
          ))
        }
        <button onClick={this.moveToPrevPage} type="button">
          PREV PAGE
        </button>
        <button onClick={this.moveToNextPage} type="button">
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
