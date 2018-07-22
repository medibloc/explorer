import { connect } from 'react-redux';

import TxList from './TxList';


const mapStateToProps = ({ blockchain, global }) => ({
  txList: blockchain.txList,
  txsFromBlock: blockchain.txsFromBlock,
  medState: blockchain.medState,

  mode: global.mode,
  page: global.page,
});

export default connect(mapStateToProps)(TxList);
