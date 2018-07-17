import React from 'react';
import { NavLink } from 'react-router-dom';

import './ContentWrapper.scss';


const ContentWrapper = ({ type, data, titles }) => {
  const { 'Block Height': height } = data;
  let hash = '';
  titles.forEach((title) => {
    if (title.toLowerCase().indexOf('hash') !== -1) hash = data[title];
  });

  return (
    <NavLink to={`/${type}/hash/${hash}`} className="contentWrapperLinker">
    <div className="contentWrapper">
        <div className="contentWrapperIcon">
          <img src={`/image/icon/ico-${type}.svg`} alt="contentWrapperIcon" />
          <img src={`/image/icon/ico-${type}-on.svg`} alt="contentWrapperIcon" />
          <span>
            { height }
          </span>
        </div>
        <div className="contentWrapperInfoTitle">
          {
            titles.map(title => (
              <span key={title}>
                {title}
              </span>
            ))
          }
        </div>
        <div className="contentWrapperInfoContent">
          {
            titles.map(title => (
              <span className={title === 'Time Stamp' ? 'special' : null} key={title}>
                {data[title]}
              </span>
            ))
          }
        </div>

    </div>
    </NavLink>
  );
};

export default ContentWrapper;
