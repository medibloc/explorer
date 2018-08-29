import { connect } from 'react-redux';

import TxList from './TxList';


const mapStateToProps = ({ blockchain, global }) => ({
  account: blockchain.account,
  block: blockchain.block,
  medState: blockchain.medState,
  txList: blockchain.txList,
  txs: blockchain.txs,
  txsFromBlock: blockchain.txsFromBlock,

  language: global.language,
  mode: global.mode,
  page: global.page,
});

export default connect(mapStateToProps)(TxList);
