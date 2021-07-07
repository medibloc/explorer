import { connect } from 'react-redux';

import LiveTickerWrapper from './LiveTickerWrapper';
import BigNumber from "bignumber.js";

// TODO: read this from explorer-server, when it's ready
const burnedTokens = new BigNumber(268785651.397875);

const mapStateToProps = ({ blockchain, global, ticker }) => ({
  medxPrice: ticker.medxPrice,

  mode: global.mode,

  totalSupply: blockchain.totalSupply,

  totalSupplyExcludingBurned: new BigNumber(blockchain.totalSupply).minus(burnedTokens).toString(),
});

export default connect(mapStateToProps)(LiveTickerWrapper);
