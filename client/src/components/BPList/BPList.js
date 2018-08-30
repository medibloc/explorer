import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import {BlockchainActions, GlobalActions, WidgetActions as w} from '../../redux/actionCreators';
import TableWithIcon from '../TableWithIcon';
import { bpsInPage } from '../../config';
import { bpMapper, spaceMapper } from '../../lib';

import './BPList.scss';


const bpRanger = (page, totalBPs) => {
  if (totalBPs < bpsInPage) return { from: 1, to: totalBPs };
  let from = (page - 1) * bpsInPage + 1;
  let to = (page) * bpsInPage;
  if (from < 1) from = 1;
  if (to > totalBPs) to = totalBPs;
  if (to < from) to = from;
  return { from, to };
};

const mappedBPs = (BPs, page, totalSupply) => {
  if (BPs === undefined) BPs = [];
  const BPList = [];
  BPs.forEach((preBP, i) => {
    const BP = bpMapper(preBP);
    BP.Ranking = (page - 1) * bpsInPage + i + 1;
    BP.votes = `${(parseInt(BP.votes, 10) / totalSupply * 100).toFixed(4)}%`;
    BPList.push(BP);
  });
  return BPList;
};

const titles = ['Ranking', 'Account', 'votes'];
const linkTo = ['account/account'];
const centerList = ['Ranking'];
const rightList = ['votes'];

class BPList extends Component {
  constructor(props) {
    super(props);
    this.getBPs = this.getBPs.bind(this);
  }

  componentWillMount() {
    this.getBPs();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (page !== prevProps.page) this.getBPs(prevProps);
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getBPs() {
    const { page, medState: { numCandidate } } = this.props;
    const { from, to } = bpRanger(page, numCandidate);
    w.loader(BlockchainActions.getBPs({ from, to }));
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
