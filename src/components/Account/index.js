import { connect } from 'react-redux';

import Account from './Account';


const mapStateToProps = ({ blockchain }) => ({
  account: blockchain.account,
  accounts: blockchain.accounts,
});

export default connect(mapStateToProps)(Account);
