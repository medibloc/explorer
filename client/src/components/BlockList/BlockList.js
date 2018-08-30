import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
// import { location as LocationType, match as MatchType } from 'react-router-prop-types';

import ListWrapper from '../ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import TableWithIcon from '../TableWithIcon';
import { contentsInPage } from '../../config';
import { blockMapper, spaceMapper } from '../../lib';
// import { getFromTo } from '../../lib/pagination';

import './BlockList.scss';


const blockRanger = (page, height) => {
  if (height < contentsInPage) return { from: 0, to: height };
  let from = (page - 1) * contentsInPage;
  let to = page * contentsInPage - 1;
  if (from < 0) from = 0;
  if (to < from) to = from;
  return { from, to };
};

const mappedBlocks = (blocks) => {
  const blockList = [];
  blocks.forEach(block => blockList.push(blockMapper(block)));
  return blockList;
};

const titles = ['Block Height', 'Time Stamp', 'Block Hash', 'No.Tx', 'BP'];
const linkTo = ['block/height', 'block/hash', 'account/bp'];
const centerList = ['Block Height', 'No.Tx'];

// const loadData = (props) => {
//   const { location: { search } } = props;
//   const { page = 1, q } = qs.parse(search);
//   const action = BlockchainActions.getBlocksFromServer({ ...getFromTo(+page, 20), q });
//   w.loader(action);
// }

class BlockList extends Component {
  constructor(props) {
    super(props);
    this.getBlocks = this.getBlocks.bind(this);
  }

  componentWillMount() {
    this.getBlocks(this.props);
  }

  componentWillUpdate(nextProps) {
    const { location: { search } } = this.props;
    if (nextProps.location.search !== search) {
      this.getBlocks(nextProps);
    }
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getBlocks(props) {
    const { location: { search } } = props;
    const { page = 1 } = qs.parse(search);
    const { medState: { height } } = props;
    const { from, to } = blockRanger(page, height);
    w.loader(BlockchainActions.getBlocks({ from, to }));
  }

  render() {
    // const { blockList: blockListInRedux, mode } = this.props;
    // const blockList = blockListInRedux.map(item => ({ id: item.id, ...item.data }));
    const { blockList, mode } = this.props;

    return (
      mode !== 2 ? (
        <ListWrapper
          titles={titles}
          data={mappedBlocks(blockList)}
          spacing={spaceMapper([2, 4, 9, 2, 3])}
          linkTo={linkTo}
          centerList={centerList}
        />
      ) : (
        <div className="blockList">
          <TableWithIcon type="block" data={blockList} />
        </div>
      )
    );
  }
}

BlockList.propTypes = {
  blockList: PropTypes.array.isRequired,
  // location: LocationType.isRequired,
  medState: PropTypes.object.isRequired,
  mode: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default BlockList;
