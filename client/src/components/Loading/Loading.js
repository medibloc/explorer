import React from 'react';
import ReactLoading from 'react-loading';


import './loading.scss';

const Loading = () => (
  <div className="loading">
    <ReactLoading
      type="spokes"
      color="#397ff4"
      height={40}
      width={40}
    />
  </div>
);

export default Loading;
