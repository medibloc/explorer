import { connect } from 'react-redux';

import BP from './BP';


const mapStateToProps = ({ blockchain, global }) => ({
  account: blockchain.account,
  bp: blockchain.bp,

  language: global.language,
});

export default connect(mapStateToProps)(BP);
