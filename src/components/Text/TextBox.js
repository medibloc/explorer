import React from 'react';
import './TextBox.css';


const TextBox = ({ mode }) => (
  <div className={mode === 0 ? "textBox" : "textBox mobile"}>
    Text Box
    { mode }
  </div>
);

export default TextBox;
