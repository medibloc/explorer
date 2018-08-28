import { connect } from 'react-redux';

import AccountList from './AccountList';


const mapStateToProps = ({ blockchain, global }) => ({
  accountList: blockchain.accountList,
  accounts: blockchain.accounts,
  totalSupply: blockchain.totalSupply,
  medState: blockchain.medState,

  mode: global.mode,
  page: global.page,
});

export default connect(mapStateToProps)(AccountList);
