import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './LiveInfoWrapper.scss';


const LiveInfoWrapper = ({ title, type, children }) => (
  <div className="liveInfoWrapper">
    <div className="liveInfoWrapperInfo">
      <span>
        {title}
      </span>
      <NavLink to={`/${type}s`}>
        <button type="button">
          View All +
        </button>
      </NavLink>
    </div>
    <div className="liveInfoWrapperContentBox">
      {children}
    </div>
  </div>
);

LiveInfoWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default LiveInfoWrapper;
