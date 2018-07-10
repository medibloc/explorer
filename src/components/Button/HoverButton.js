import React from 'react';
import './HoverButton.scss';


const HoverButton = ({ children }) => (
  <div className="hoverButton">
    { children }
  </div>
);

export default HoverButton;
