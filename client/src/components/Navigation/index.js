import { connect } from 'react-redux';

import Navigation from './Navigation';


const mapStateToProps = ({ blockchain, global }) => ({
  numAccounts: blockchain.medState.numAccount,
  numCandidates: blockchain.medState.numCandidate,
  numTxs: blockchain.medState.numTx,
  numBlocks: blockchain.medState.height,
  txList: blockchain.txList,

  page: global.page,
});

export default connect(mapStateToProps)(Navigation);
