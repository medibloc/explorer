import { connect } from 'react-redux';

import Block from './Block';


const mapStateToProps = ({ blockchain }) => ({
  block: blockchain.block,
  blockList: blockchain.blockList
});

export default connect(mapStateToProps)(Block);
