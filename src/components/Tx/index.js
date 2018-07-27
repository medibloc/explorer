import { connect } from 'react-redux';

import Tx from './Tx';


const mapStateToProps = ({ blockchain }) => ({
  tx: blockchain.tx,
});

export default connect(mapStateToProps)(Tx);
