import React from 'react';

import './ContentBox.scss';


const ContentBox = ({ children }) => (
  <div className="contentBox">
    {children}
  </div>
);

export default ContentBox;
