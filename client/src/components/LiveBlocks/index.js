import { connect } from 'react-redux';

import LiveBlocks from './LiveBlocks';


const mapStateToProps = ({ blockchain }) => ({
  blocks: blockchain.blocks,
});

export default connect(mapStateToProps)(LiveBlocks);
