import React from 'react';

import './ContentWrapper.scss';


const ContentWrapper = ({ type, data }) => {
  const { Height } = data;

  return (
    <div className="contentWrapper">
      <div className="contentWrapperIcon">
        <img src={`/image/icon/ico-${type}.svg`} alt="contentWrapperIcon" />
        <img src={`/image/icon/ico-${type}-on.svg`} alt="contentWrapperIcon" />
        <span>
          { Height }
        </span>
      </div>
      <div className="contentWrapperInfoTitle">
        {
          Object.keys(data).map(key => (
            <span>
              {key}
            </span>
          ))
        }
      </div>
      <div className="contentWrapperInfoContent">
        {
          Object.keys(data).map(key => (
            <span className={key.toLowerCase() === 'timestamp' && 'special'}>
              {data[key]}
            </span>
          ))
        }
      </div>
    </div>
  );
};

export default ContentWrapper;
