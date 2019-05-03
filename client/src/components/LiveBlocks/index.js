import { connect } from 'react-redux';

import LiveBlocks from './LiveBlocks';


const mapStateToProps = ({ blockchain, global }) => ({
  blocks: blockchain.blocks,

  lang: global.language,
  mode: global.mode,
});

export default connect(mapStateToProps)(LiveBlocks);
