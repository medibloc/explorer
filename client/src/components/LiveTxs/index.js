import { connect } from 'react-redux';

import LiveTxs from './LiveTxs';


const mapStateToProps = ({ blockchain }) => ({
  liveTxs: blockchain.liveTxs,
});

export default connect(mapStateToProps)(LiveTxs);
