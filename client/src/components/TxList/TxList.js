import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import { GlobalActions } from '../../redux/actionCreators';
import TableWithIcon from '../TableWithIcon';
import { spaceMapper, txMapper } from '../../lib';
import { contentsInPage } from '../../config';

import './TxList.scss';


const mappedTxList = (txs, page) => {
  // eslint-disable-next-line no-param-reassign
  txs = txs.slice((page - 1) * contentsInPage, page * contentsInPage);
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
  componentWillUnmount() {
    GlobalActions.movePage(1);
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

    return (
      <div className="txList">
        {
          (mode !== 2 && type !== 'tx') && (
            <ListWrapper
              titles={titles}
              data={mappedTxList(txList, page)}
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
              data={mappedTxList(txList, page)}
              spacing={spaceMapper([1])}
              linkTo={['tx/hash']}
            />
          )
        }
        {
          (mode === 2 && type === 'tx') && (
            <TableWithIcon type="tx" data={mappedTxList(txs, page)} />
          )
        }
        {
          (mode !== 2 && type === 'tx') && (
            <ListWrapper
              titles={titles}
              data={mappedTxList(txs, page)}
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
