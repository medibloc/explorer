import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import { spaceMapper, txMapper } from '../../lib';
import { GlobalActions } from '../../redux/actionCreators';

import './TxList.scss';


const mappedTxList = (txs) => {
  const txList = [];
  txs.forEach(tx => txList.push(txMapper(tx)));
  return txList;
};

const titleList = {
  account: ['Transaction Hash', 'Time Stamp', 'From', 'To', 'Amount'],
  block: ['Transaction Hash', 'From', 'To', 'Amount'],
};

const spaceList = {
  account: [2, 1, 2, 2, 1],
  block: [2, 2, 2, 1],
};

class TxList extends Component {
  constructor(props) {
    super(props);
    this.getTransactions = this.getTransactions.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (page !== prevProps.page) this.getTransactions();
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getTransactions() {
    const { page, medState: { height } } = this.props;

  }

  render() {
    const {
      mode,
      txList,
      linkTo,
      spacing,
      data,
      type,
    } = this.props;
    const titles = type ? titleList[type] : [];
    const spaces = type ? spaceList[type] : [];

    return (
      <div className="txList">
        {
          mode !== 2 ? (
            <ListWrapper
              titles={titles}
              data={mappedTxList(txList)}
              spacing={spaceMapper(spaces)}
              linkTo={['tx/hash', 'acc/from', 'acc/to']}
            />
          ) : (
            <ListWrapper
              titles={['Transaction Hash']}
              data={mappedTxList(txList)}
              spacing={spaceMapper([1])}
              linkTo={['tx/hash']}
            />
          )
        }
      </div>
    );
  }
}

export default TxList;
