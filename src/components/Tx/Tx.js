import React, { Component } from 'react';

import DetailWrapper from '../DetailWrapper';
import { txMapper } from '../../lib';
import { BlockchainActions, WidgetActions as w } from '../../redux/actionCreators';


// const txPicker = (pool, hash) => {
//   let tx = null;
//   pool.forEach((tr) => {
//     if (tr.hash === hash) tx = tr;
//   });
//   return tx;
// };

class Tx extends Component {
  componentWillMount() {
    const { hash } = this.props;
    w.loader(BlockchainActions.getTx(hash));
  }

  render() {
    const { tx } = this.props;

    return !tx ? (
      <div>
        LOADING
      </div>
    ) : (
      <DetailWrapper data={txMapper(tx)} type="tx" />
    );
  }
}

export default Tx;
