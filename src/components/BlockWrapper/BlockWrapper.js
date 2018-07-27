import PropTypes from 'prop-types';
import React from 'react';

import './BlockWrapper.scss';


const BlockWrapper = ({ children }) => (
  <div className="blockWrapper">
    {children}
  </div>
);

BlockWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BlockWrapper;
