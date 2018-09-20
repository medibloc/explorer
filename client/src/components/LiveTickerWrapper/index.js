import { connect } from 'react-redux';

import LiveTickerWrapper from './LiveTickerWrapper';


const mapStateToProps = ({ blockchain, global, ticker }) => ({
  medxPrice: ticker.medxPrice,

  mode: global.mode,

  totalSupply: blockchain.totalSupply,
});

export default connect(mapStateToProps)(LiveTickerWrapper);
