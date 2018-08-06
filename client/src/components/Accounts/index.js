import { connect } from 'react-redux';

import Accounts from './Accounts';


const mapStateToProps = ({ blockchain }) => ({
  accounts: blockchain.accounts,
});

export default connect(mapStateToProps)(Accounts);
