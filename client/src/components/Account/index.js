import { connect } from 'react-redux';

import Account from './Account';


const mapStateToProps = ({ blockchain, global }) => ({
  account: blockchain.account,

  language: global.language,
});

export default connect(mapStateToProps)(Account);
