import PropTypes from 'prop-types';
import React from 'react';

import './LiveTickerWrapper.scss';


const LiveTickerWrapper = ({ title, value, suffix }) => (
  <div className="liveTickerWrapperGuide">
    <div className="liveTickerWrapper">
      <div className="liveTickerWrapperTitle">
        {title}
      </div>
      <div className="liveTickerWrapperContent">
        <div>
          {value}
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
  value: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
};

export default LiveTickerWrapper;
