import React from 'react';
import { connect } from 'react-redux';

import ListWrapper from '../../components/ListWrapper';
import { spaceMapper } from '../../lib';

import './TxList.scss';


const titles = ['Transaction Hash', 'From', 'To', 'Amount'];
const data = [{
  'Transaction Hash': 123123123,
  From: 123123123,
  To: 123123123,
  Amount: 123123123,
}];

const TxList = ({ txList }) => {
  return (
    <div className="txList">
      <ListWrapper
        titles={titles}
        data={data}
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
