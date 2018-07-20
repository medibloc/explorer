import { connect } from 'react-redux';

import LiveTxs from './LiveTxs';


const mapStateToProps = ({ blockchain }) => ({
  txsFromBlock: blockchain.txsFromBlock,
});

export default connect(mapStateToProps)(LiveTxs);
