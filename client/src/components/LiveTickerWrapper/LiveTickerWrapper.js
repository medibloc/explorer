import PropTypes from 'prop-types';
import React from 'react';

import './LiveTickerWrapper.scss';


const injectComma = supply => supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const LiveTickerWrapper = ({ title, suffix, medxPrice, totalSupply }) => (
  <div className="liveTickerWrapperGuide">
    <div className="liveTickerWrapper">
      <div className="liveTickerWrapperTitle">
        {title}
      </div>
      <div className="liveTickerWrapperContent">
        <div>
          { suffix === 'USD' ? injectComma((medxPrice * totalSupply).toFixed(0)) : injectComma(totalSupply) }
        </div>
        <div className="liveTickerWrapperContentSuffix">
          {suffix}
        </div>
      </div>
    </div>
  </div>
);

LiveTickerWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  // value: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
};

export default LiveTickerWrapper;
