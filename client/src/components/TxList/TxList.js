import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import TableWithIcon from '../TableWithIcon';
import { spaceMapper, txMapper } from '../../lib';
import { contentsInPage } from '../../config';

import './TxList.scss';


const txRanger = (page, numTxs) => {
  if (numTxs < contentsInPage) return { from: 0, to: numTxs };
  let from = (page - 1) * contentsInPage;
  let to = page * contentsInPage - 1;
  if (from < 0) from = 0;
  if (to < from) to = from;
  return { from, to };
};

const mappedTxs = (txs) => {
  if (txs.length < 1) return [];
  const txList = [];
  txs.forEach(tx => txList.push(txMapper(tx)));
  return txList;
};

const titleList = {
  account: ['Transaction Hash', 'Time Stamp', 'From', 'To', 'Amount'],
  block: ['Transaction Hash', 'From', 'To', 'Amount'],
  tx: ['Transaction Hash', 'Time Stamp', 'From', 'To', 'Amount'],
};

const spaceList = {
  account: [2, 1, 2, 2, 1],
  block: [28, 28, 28, 16],
  tx: [20, 15, 20, 20, 15],
};

class TxList extends Component {
  constructor(props) {
    super(props);
    this.getTxs = this.getTxs.bind(this);
  }

  componentWillMount() {
    if (this.props.type === 'tx') this.getTxs();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (page !== prevProps.page) this.getTxs();
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getTxs() {
    const { page, medState: { numTx } } = this.props;
    const { from, to } = txRanger(page, numTx);
    w.loader(BlockchainActions.getTxs({ from, to }));
  }

  render() {
    const {
      mode,
      page,
      txList,
      txs,
      type,
    } = this.props;
    const titles = type ? titleList[type] : [];
    const spaces = type ? spaceList[type] : [];
    const { from, to } = txRanger(page, txs.length);

    return (
      <div className="txList">
        {
          (mode !== 2 && type !== 'tx') && (
            <ListWrapper
              titles={titles}
              data={mappedTxs(txs.slice(from, to))}
              spacing={spaceMapper(spaces)}
              linkTo={['tx/hash', 'account/from', 'account/to']}
              centerList={['Amount']}
              rightList={['Amount']}
            />
          )
        }
        {
          (mode === 2 && type !== 'tx') && (
            <ListWrapper
              titles={['Transaction Hash']}
              data={mappedTxs(txs.slice(from, to))}
              spacing={spaceMapper([1])}
              linkTo={['tx/hash']}
            />
          )
        }
        {
          (mode === 2 && type === 'tx') && (
            <TableWithIcon type="tx" data={txList} />
          )
        }
        {
          (mode !== 2 && type === 'tx') && (
            <ListWrapper
              titles={titles}
              data={mappedTxs(txList)}
              spacing={spaceMapper(spaces)}
              linkTo={['tx/hash', 'account/from', 'account/to']}
              centerList={['Amount']}
              rightList={['Amount']}
            />
          )
        }
      </div>
    );
  }
}

TxList.propTypes = {
  mode: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  txList: PropTypes.array.isRequired,
  txs: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default TxList;
