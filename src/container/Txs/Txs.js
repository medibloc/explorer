import React from 'react';
import { connect } from 'react-redux';

import ContentWrapper from '../../components/ContentWrapper';
import { txMapper } from '../../lib';


const titles = ['Transaction Hash', 'Time Stamp'];

const Txs = ({ txsFromBlock }) => (
  <div className="txs">
    {
      txsFromBlock.map(tx => (
        <ContentWrapper type="tx" data={txMapper(tx)} titles={titles} />
      ))
    }
  </div>
);

const mapStateToProps = ({ blockchain }) => ({
  txsFromBlock: blockchain.txsFromBlock,
  tailBlock: blockchain.tailBlock,
});

export default connect(mapStateToProps)(Txs);
