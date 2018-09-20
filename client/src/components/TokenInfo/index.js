import { connect } from 'react-redux';

import TokenInfo from './TokenInfo';

const mapStateToProps = ({ global }) => ({
  mode: global.mode,
});

export default connect(mapStateToProps)(TokenInfo);
