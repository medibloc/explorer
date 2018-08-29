import { connect } from 'react-redux';

import LiveTxs from './LiveTxs';


const mapStateToProps = ({ blockchain, global }) => ({
  blocks: blockchain.blocks,

  language: global.language,
});

export default connect(mapStateToProps)(LiveTxs);
