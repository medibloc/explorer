import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListWrapper from '../../components/ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import { blocksInPage } from '../../config';
import { blockMapper, spaceMapper } from '../../lib';


const blockRanger = (page, height) => {
  if (height < blocksInPage) return { from: 1, to: height };
  let from = height - page * blocksInPage + 1;
  let to = height - (page - 1) * blocksInPage;
  if (from < 1) from = 1;
  if (to < 1) to = 0;
  return { from, to };
};
const mappedBlocks = (blocks) => {
  const blockList = [];
  blocks.forEach(block => blockList.push(blockMapper(block)));
  return blockList;
};


const titles = ['Block Height', 'Time Stamp', 'Block Hash', 'No.Tx', 'BP'];
const LinkTo = ['block/hash', 'account/bp'];


class BlockList extends Component {
  constructor(props) {
    super(props);
    this.getBlocks = this.getBlocks.bind(this);
  }

  componentWillMount() {
    this.getBlocks();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (page !== prevProps.page) this.getBlocks();
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getBlocks() {
    const { page, medState: { height } } = this.props;
    const { from, to } = blockRanger(page, height);
    w.loader(BlockchainActions.getBlocks({ from, to }));
  }

  render() {
    const { blockList, loading } = this.props;
    return loading ? (
      <div>
        LOADING
      </div>
    ) : (
      <div>
        <ListWrapper
          titles={titles}
          data={mappedBlocks(blockList)}
          spacing={spaceMapper([1, 1, 3, 1, 1])}
          linkTo={LinkTo}
        />
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
