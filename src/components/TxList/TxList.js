import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import { spaceMapper, txMapper } from '../../lib';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';

import './TxList.scss';


const mappedTxList = (txs) => {
  const txList = [];
  txs.forEach(tx => txList.push(txMapper(tx)));
  return txList;
};

const titles = ['Transaction Hash', 'From', 'To', 'Amount'];

class TxList extends Component {
  constructor(props) {
    super(props);
    this.getTransactions = this.getTransactions.bind(this);
  }

  componentWillMount() {
    this.getTransactions();
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
    const { mode, txsFromBlock, linkTo, spacing, data } = this.props;
    return (
      <div className="txList">
        {
          mode !== 2 ? (
            <ListWrapper
              titles={titles}
              data={mappedTxList(txsFromBlock)}
              spacing={spaceMapper([2, 2, 2, 1])}
              linkTo={["tx/hash", "acc/from", "acc/to"]}
            />
          ) : (
            <ListWrapper
              titles={['Transaction Hash']}
              data={mappedTxList(txsFromBlock)}
              spacing={spaceMapper([1])}
              linkTo={["tx/hash"]}
            />
          )
        }
      </div>
    );
  }
}

export default TxList;
