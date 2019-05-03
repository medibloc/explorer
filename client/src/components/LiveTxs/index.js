import { connect } from 'react-redux';

import LiveTxs from './LiveTxs';


const mapStateToProps = ({ blockchain, global }) => ({
  liveTxs: blockchain.liveTxs,

  lang: global.language,
  mode: global.mode,
});

export default connect(mapStateToProps)(LiveTxs);
