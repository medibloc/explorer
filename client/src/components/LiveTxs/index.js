import { connect } from 'react-redux';

import LiveTxs from './LiveTxs';


const mapStateToProps = ({ blockchain }) => ({
  blocks: blockchain.blocks,
});

export default connect(mapStateToProps)(LiveTxs);
