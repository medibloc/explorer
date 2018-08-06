import { connect } from 'react-redux';

import LiveTxs from './LiveTxs';


const mapStateToProps = ({ blockchain, global }) => ({
  txs: blockchain.txs,

  language: global.language,
});

export default connect(mapStateToProps)(LiveTxs);
