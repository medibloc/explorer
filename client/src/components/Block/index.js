import { connect } from 'react-redux';

import Block from './Block';


const mapStateToProps = ({ blockchain, global }) => ({
  block: blockchain.block,
  blockList: blockchain.blockList,

  language: global.language,
});

export default connect(mapStateToProps)(Block);
