import React from 'react';
import { connect } from 'react-redux';

import ListWrapper from '../../components/ListWrapper';
import { spaceMapper, txMapper } from '../../lib';

import './TxList.scss';


const titles = ['Transaction Hash', 'From', 'To', 'Amount'];

const TxList = ({ txList, mode }) => {
  const mappedTxList = [];
  txList.forEach(tx => mappedTxList.push(txMapper(tx)));

  return (
    <div className="txList">
      {
        mode !== 2 ? (
          <ListWrapper
            titles={titles}
            data={mappedTxList}
            spacing={spaceMapper([2, 2, 2, 1])}
            linkTo={["tx/hash", "acc/from", "acc/to"]}
          />
        ) : (
          <ListWrapper
            titles={['Transaction Hash']}
            data={mappedTxList}
            spacing={spaceMapper([1])}
            linkTo={["tx/hash"]}
          />
        )
      }

    </div>
  );
};

const mapStateToProps = ({ blockchain, global }) => ({
  txList: blockchain.txList,
  mode: global.mode,
});

export default connect(mapStateToProps)(TxList);
