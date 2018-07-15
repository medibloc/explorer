import React from 'react';

import './ListWrapper.scss';


const ListWrapper = ({ titles, data, spacing }) => (
  <div className="listWrapper">
    <div className="listWrapperTitles">
      {
        titles.map((title, i) => (
          <span style={{ width: `${spacing[i]}%` }}>
            {title}
          </span>
        ))
      }
    </div>
    <div className="listWrapperContents">
      {
        data.map(datum => (
          <div className="listWrapperContentRow">
            {
              titles.map((title, i) => (
                <span style={{ width: `${spacing[i]}%` }}>
                  {datum[title]}
                </span>
              ))
            }
          </div>
        ))

      }
    </div>
  </div>
);

export default ListWrapper;
