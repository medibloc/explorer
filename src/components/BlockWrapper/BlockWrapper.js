import React from 'react';

import './BlockWrapper.scss';


const BlockWrapper = ({ children }) => (
  <div className="blockWrapper">
    {children}
  </div>
);

export default BlockWrapper;
