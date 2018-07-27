import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './ContentWrapper.scss';


const ContentWrapper = ({ type, data, titles }) => {
  const { 'Block Height': height } = data;
  let hash = '';
  titles.forEach((title) => {
    const ti = title.toLowerCase();
    if (ti.indexOf('hash') !== -1) hash = data[title];
    if (ti.indexOf('number') !== -1) hash = data[title];
    if (ti.indexOf('account') !== -1) hash = data[title];
  });
  const url = `/${type}/${hash}`;

  return (
    <NavLink to={url} className="contentWrapperLinker">
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

ContentWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  titles: PropTypes.array.isRequired,
};

export default ContentWrapper;
