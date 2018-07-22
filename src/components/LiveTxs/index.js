import { connect } from 'react-redux';

import LiveTxs from './LiveTxs';


const mapStateToProps = ({ blockchain }) => ({
  txs: blockchain.txs,
});

export default connect(mapStateToProps)(LiveTxs);
