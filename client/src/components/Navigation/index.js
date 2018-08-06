import { connect } from 'react-redux';

import Navigation from './Navigation';


const mapStateToProps = ({ blockchain, global }) => ({
  accounts: blockchain.accounts,
  txList: blockchain.txList,
  last: parseInt(blockchain.medState.height, 10),

  page: global.page,
});

export default connect(mapStateToProps)(Navigation);
