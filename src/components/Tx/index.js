import { connect } from 'react-redux';

import Tx from './Tx';


const mapStateToProps = ({ blockchain }) => ({
  tx: blockchain.tx,
  txList: blockchain.txList,
  txs: blockchain.txs,
});

export default connect(mapStateToProps)(Tx);
