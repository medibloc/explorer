import { connect } from 'react-redux';

import Navigation from './Navigation';


const mapStateToProps = ({ blockchain, global }) => ({
  // TODO @ggomma set numTxs with correct value
  // numAccTxs: blockchain.account.numTxs,
  numAccTxs: 30,
  numAccounts: blockchain.medState.numAccount,
  numCandidates: blockchain.medState.numCandidate,
  numTxs: blockchain.medState.numTx,
  numBlocks: blockchain.medState.height,
  txList: blockchain.txList,
  txs: blockchain.txs,

  page: global.page,
});

export default connect(mapStateToProps)(Navigation);
