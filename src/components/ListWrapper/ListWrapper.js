import React from 'react';
import { NavLink } from 'react-router-dom';

import { timeConverter } from '../../lib';

import './ListWrapper.scss';


const linkDistributor = (datum, titles, linkTo = [], spacing) => titles.map((title, i) => {
  let content = null;
  linkTo.forEach((link) => {
    const seperator = link.split('/');
    if (title.toLowerCase().includes(seperator[1])) {
      content = (
        <NavLink
          to={`/${seperator[0]}/${datum[title]}`}
          style={{ width: `${spacing[i]}%` }}
          key={title}
        >
          {datum[title]}
        </NavLink>
      );
    }
  });

  if (!content) {
    const d = Object.assign({}, datum, {
      'Time Stamp': timeConverter(datum['Time Stamp']),
    });
    content = (
      <span
        style={{ width: `${spacing[i]}%` }}
        key={title}
      >
        {d[title]}
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
            { linkDistributor(datum, titles, linkTo, spacing) }
          </div>
        ))
      }
    </div>
  </div>
);

export default ListWrapper;
