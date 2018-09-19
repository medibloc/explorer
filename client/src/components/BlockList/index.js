import { connect } from 'react-redux';

import BlockList from './BlockList';


const mapStateToProps = ({ blockchain, global }) => ({
  blockList: blockchain.blockList,
  medState: blockchain.medState,

  mode: global.mode,
  page: global.page,
});

export default connect(mapStateToProps)(BlockList);
