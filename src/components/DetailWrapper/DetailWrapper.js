import React from 'react';

import './DetailWrapper.scss';


const DetailWrapper = ({ data, keyList }) => (
  <div className="detailWrapper">
    <div className="detailWrapperKey">
      {
        keyList.map(key => (
          <span key={key}>
            {key}
          </span>
        ))
      }
    </div>
    <div className="detailWrapperValue">
      {
        keyList.map(key => (
          <span key={key}>
            {data[key]}
          </span>
        ))
      }
    </div>
  </div>
);

export default DetailWrapper;
