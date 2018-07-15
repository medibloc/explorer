import React from 'react';
import { connect } from 'react-redux';

import ListWrapper from '../../components/ListWrapper';
import { spaceMapper, txMapper } from '../../lib';

import './TxList.scss';


const titles = ['Transaction Hash', 'From', 'To', 'Amount'];

const TxList = ({ txList }) => {
  const mappedTxList = [];
  txList.forEach(tx => mappedTxList.push(txMapper(tx)));

  return (
    <div className="txList">
      <ListWrapper
        titles={titles}
        data={mappedTxList}
        spacing={spaceMapper([2, 2, 2, 1])}
        /*LinkTo={}*/
      />
    </div>
  );
};

const mapStateToProps = ({ blockchain }) => ({
  txList: blockchain.txList,
});

export default connect(mapStateToProps)(TxList);
