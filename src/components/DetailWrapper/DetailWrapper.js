import React from 'react';
import { NavLink } from 'react-router-dom';

import './DetailWrapper.scss';


const titles = {
  block: ['Block Height', 'Time Stamp', 'Block Hash', 'Prev Hash', 'Amount', 'No.Tx', 'BP'],
  tx: ['Transaction Hash', 'Status', 'Time Stamp', 'From', 'To', 'Amount'],
  account: ['Account', 'Balance', 'Transactions'],
};

const linkTo = {
  block: ['block/Prev Hash', 'account/BP'],
  tx: ['account/From', 'account/To'],
  account: [],
};

const DetailWrapper = ({ data, type }) => {
  const titleList = type ? titles[type] : [];
  const linkList = type ? linkTo[type] : [];

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
          titleList.map((title) => {
            for (let i = 0; i < linkList.length; i += 1) {
              if (linkList[i].includes(title)) {
                return (
                  <span key={title}>
                    <NavLink to={`/${linkList[i].split('/')[0]}/${data[title]}`}>
                      {data[title]}
                    </NavLink>
                  </span>
                );
              }
            }
            return (
              <span key={title}>
                {data[title]}
              </span>
            );
          })
        }
      </div>
    </div>
  );
};

export default DetailWrapper;
