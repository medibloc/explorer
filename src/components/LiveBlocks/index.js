import { connect } from 'react-redux';

import LiveBlocks from './LiveBlocks';


const mapStateToProps = ({ blockchain, global }) => ({
  blocks: blockchain.blocks,

  language: global.language,
});

export default connect(mapStateToProps)(LiveBlocks);
