import { connect } from 'react-redux';

import Tx from './Tx';


const mapStateToProps = ({ blockchain, widget }) => ({
  tx: blockchain.tx,
  txList: blockchain.txList,
  txs: blockchain.txs,

  loading: widget.loading,
});

export default connect(mapStateToProps)(Tx);
