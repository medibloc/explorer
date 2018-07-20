import React, { Component } from 'react';

import DetailWrapper from '../DetailWrapper';
import { txMapper } from '../../lib';
import { BlockchainActions, WidgetActions as w } from '../../redux/actionCreators';


const txPicker = (pool, hash) => {
  let tx = null;
  pool.forEach((tr) => {
    if (tr.hash === hash) tx = tr;
  });
  return tx;
};

class Tx extends Component {
  componentWillMount() {
    const {
      hash,
      txList,
      txs,
    } = this.props;
    let tx = txPicker(txList, hash);
    if (!tx) tx = txPicker(txs, hash);
    if (!tx) {
      if (!hash) throw new Error('Invalid tx info');

      w.loader(BlockchainActions.getTx(hash));
    }
    if (tx) BlockchainActions.setTx(tx);
  }

  render() {
    const { tx, loading } = this.props;

    return loading ? (
      <div>
        LOADING
      </div>
    ) : (
      <DetailWrapper data={txMapper(tx)} type="tx" />
    );
  }
}

export default Tx;
