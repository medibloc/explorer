import { connect } from 'react-redux';

import Block from './Block';


const mapStateToProps = ({ blockchain, global }) => ({
  block: blockchain.block,

  language: global.language,
  mode: global.mode,
});

export default connect(mapStateToProps)(Block);
