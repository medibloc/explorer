import React from 'react';

import './LiveInfoWrapper.scss';


const LiveInfoWrapper = ({ title, children }) => (
  <div className="liveInfoWrapper">
    <div className="liveInfoWrapperInfo">
      <span>
        {title}
      </span>
      <button type="button">
        View All +
      </button>
    </div>
    <div className="liveInfoWrapperContentBox">
      {children}
    </div>
  </div>
);

export default LiveInfoWrapper;
