import { connect } from 'react-redux';

import AccountList from './AccountList';


const mapStateToProps = ({ blockchain, global }) => ({
  accounts: blockchain.accounts,
  totalSupply: blockchain.totalSupply,

  mode: global.mode,
  page: global.page,
});

export default connect(mapStateToProps)(AccountList);
