import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import { BlockchainActions, GlobalActions } from '../../redux/actionCreators';
import TableWithIcon from '../TableWithIcon';
import { bpsInPage } from '../../config';
import { bpMapper, spaceMapper } from '../../lib';

import './BPList.scss';


const bpRanger = (page, totalBPs) => {
  if (totalBPs < bpsInPage) return { from: 1, to: totalBPs };
  let from = (page - 1) * bpsInPage + 1;
  let to = (page) * bpsInPage;
  if (from < 1) from = 1;
  if (to < 1) to = 0;
  if (to > totalBPs) to = totalBPs;
  return { from, to };
};

const mappedBPs = (BPs, page, totalSupply) => {
  if (BPs === undefined) BPs = [];
  const { from, to } = bpRanger(page, BPs.length);
  const BPList = [];
  for (let i = from - 1; i < to; i += 1) {
    const bp = bpMapper(BPs[i]);
    bp.Ranking = i + 1;
    bp.votes = `${(parseInt(bp.votes, 10) / totalSupply * 100).toFixed(4)}%`;
    BPList.push(bp);
  }
  return BPList;
};

const titles = ['Ranking', 'Account', 'votes'];
const linkTo = ['account/account'];
const centerList = ['Ranking'];
const rightList = ['votes'];

class BPList extends Component {
  componentWillMount() {
    BlockchainActions.getBPs();
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  render() {
    const {
      bpList,
      mode,
      page,
      totalSupply,
    } = this.props;

    return (
      mode !== 2 ? (
        <ListWrapper
          titles={titles}
          data={mappedBPs(bpList, page, totalSupply)}
          spacing={spaceMapper([10, 65, 10])}
          linkTo={linkTo}
          centerList={centerList}
          rightList={rightList}
        />
      ) : (
        <div className="blockList">
          <TableWithIcon type="bp" data={mappedBPs(bpList, page, totalSupply)} />
        </div>
      )
    );
  }
}

BPList.propTypes = {
  bpList: PropTypes.array.isRequired,
  mode: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalSupply: PropTypes.number.isRequired,
};

export default BPList;
