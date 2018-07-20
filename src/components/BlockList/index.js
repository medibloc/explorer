import { connect } from 'react-redux';

import BlockList from './BlockList';


const mapStateToProps = ({ blockchain, global, widget }) => ({
  blockList: blockchain.blockList,
  medState: blockchain.medState,

  loading: widget.loading,

  mode: global.mode,
  page: global.page,
});

export default connect(mapStateToProps)(BlockList);
