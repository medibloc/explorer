import { connect } from 'react-redux';

import Account from './Account';


const mapStateToProps = ({ blockchain, global }) => ({
  account: blockchain.account,
  accounts: blockchain.accounts,

  language: global.language,
});

export default connect(mapStateToProps)(Account);
