import { connect } from 'react-redux';

import Block from './Block';


const mapStateToProps = ({ blockchain, widget }) => ({
  block: blockchain.block,
  blocks: blockchain.blocks,
  blockList: blockchain.blockList,

  loading: widget.loading,
});

export default connect(mapStateToProps)(Block);
