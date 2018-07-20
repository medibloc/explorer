import React from 'react';

import './DetailWrapper.scss';


const titles = {
  block: ['Block Height', 'Time Stamp', 'Block Hash', 'Prev Hash', 'Amount', 'No.Tx', 'BP'],
  tx: ['Transaction Hash', 'Status', 'Time Stamp', 'From', 'To', 'Amount'],
  account: ['Account', 'Balance', 'Transactions'],
};

const DetailWrapper = ({ data, type }) => {
  const titleList = type ? titles[type] : [];

  return (
    <div className="detailWrapper">
      <div className="detailWrapperKey">
        {
          titleList.map(title => (
            <span key={title}>
              {title}
            </span>
          ))
        }
      </div>
      <div className="detailWrapperValue">
        {
          titleList.map(title => (
            <span key={title}>
              {data[title]}
            </span>
          ))
        }
      </div>
    </div>
  );
};

export default DetailWrapper;
