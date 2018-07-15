import React from 'react';
import { NavLink } from 'react-router-dom';

import './ListWrapper.scss';


const linkDistributor = (datum, titles, linkTo, spacing) => titles.map((title, i) => {
  let content = null;
  linkTo.forEach((link) => {
    const seperator = link.split('/')[1];
    if (title.toLowerCase().includes(seperator)) {
      content = (
        <NavLink to={`${link}/${datum[title]}`} style={{ width: `${spacing[i]}%` }} key={title}>
          {datum[title]}
        </NavLink>
      );
    }
  });

  if (!content) {
    content = (
      <span style={{ width: `${spacing[i]}%` }} key={title}>
        {datum[title]}
      </span>
    );
  }
  return content;
});

const ListWrapper = ({
  titles,
  data,
  spacing,
  linkTo,
}) => (
  <div className="listWrapper">
    <div className="listWrapperTitles">
      {
        titles.map((title, i) => (
          <span style={{ width: `${spacing[i]}%` }} key={title}>
            {title}
          </span>
        ))
      }
    </div>
    <div className="listWrapperContents">
      {
        data.map((datum, i) => (
          // eslint-disable-next-line
          <div className="listWrapperContentRow" key={i}>
            {
              linkDistributor(datum, titles, linkTo, spacing)
            }
          </div>
        ))

      }
    </div>
  </div>
);

export default ListWrapper;
