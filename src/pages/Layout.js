import React from 'react';


const Layout = ({ children }) => (
  <div className="layout">
    <div className="layoutInner">
      { children }
    </div>
  </div>
);

export default Layout;
