import { connect } from 'react-redux';

import LiveTickerWrapper from './LiveTickerWrapper';


const mapStateToProps = ({ blockchain, ticker }) => ({
  medxPrice: ticker.medxPrice,
  totalSupply: blockchain.totalSupply,
});

export default connect(mapStateToProps)(LiveTickerWrapper);
