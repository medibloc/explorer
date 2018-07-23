import { connect } from 'react-redux';

import Navigation from './Navigation';


const mapStateToProps = ({ blockchain, global }) => ({
  accounts: blockchain.accounts,
  txList: blockchain.txList,
  last: blockchain.medState.height,

  page: global.page,
});

export default connect(mapStateToProps)(Navigation);
