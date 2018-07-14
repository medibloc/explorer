import React from 'react';

import './ListWrapper.scss';


const ListWrapper = ({ titles, data, spacing }) => (
  <div className="listWrapper">
    <div className="listWrapperTitles">
      {
        titles.map((title, i) => (
          <span className={`content${spacing[i]}`}>
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
                <span className={`content${spacing[i]}`}>
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
