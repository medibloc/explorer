import React from 'react';

import './LiveTickerWrapper.scss';


const LiveTickerWrapper = ({ title, value, suffix }) => (
  <div className="liveTickerWrapper">
    <div className="liveTickerWrapperTitle">
      {title}
    </div>
    <div className="liveTickerWrapperContent">
      <div className="liveTickerWrapperContentValue">
        {value}
      </div>
      <div className="liveTickerWrapperContentSuffix">
        {suffix}
      </div>
    </div>
  </div>
);

export default LiveTickerWrapper;
