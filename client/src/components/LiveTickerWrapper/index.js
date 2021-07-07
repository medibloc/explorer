import { connect } from 'react-redux';

import LiveTickerWrapper from './LiveTickerWrapper';
import BigNumber from "bignumber.js";
import { burnedTokens } from "../../config";

const mapStateToProps = ({ blockchain, global, ticker }) => ({
  medxPrice: ticker.medxPrice,

  mode: global.mode,

  totalSupply: blockchain.totalSupply,

  totalSupplyExcludingBurned: new BigNumber(blockchain.totalSupply).minus(burnedTokens).toString(),
});

export default connect(mapStateToProps)(LiveTickerWrapper);
