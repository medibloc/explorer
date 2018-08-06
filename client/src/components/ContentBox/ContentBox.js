import PropTypes from 'prop-types';
import React from 'react';

import './ContentBox.scss';


const ContentBox = ({ children }) => (
  <div className="contentBox">
    {children}
  </div>
);

ContentBox.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContentBox;
