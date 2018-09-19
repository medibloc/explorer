import PropTypes from 'prop-types';
import React from 'react';

import './LiveTickerWrapper.scss';


const injectComma = supply => supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const LiveTickerWrapper = ({ title, suffix, medxPrice, totalSupply }) => (
  <div className="liveTickerWrapperGuide">
    <div className="liveTickerWrapper">
      <div className="liveTickerWrapperTitle">
        {title}
      </div>
      <div className="liveTickerWrapperContent">
        <div>
          { suffix === 'USD' ? medxPrice.toFixed(5) : injectComma(totalSupply) }
        </div>
        <div className="liveTickerWrapperContentSuffix">
          {suffix}
        </div>
      </div>
    </div>
  </div>
);

LiveTickerWrapper.propTypes = {
  suffix: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default LiveTickerWrapper;
