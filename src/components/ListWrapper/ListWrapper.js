import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { timeConverter } from '../../lib';

import './ListWrapper.scss';


const linkDistributor = (
  datum,
  titles,
  linkTo = [],
  spacing,
  centerList = [],
) => titles.map((title, i) => {
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
      'Time Stamp': datum['Time Stamp'] && timeConverter(datum['Time Stamp']),
    });
    content = (
      <span
        style={{ width: `${spacing[i]}%`, textAlign: `${centerList.indexOf(title) !== -1 && 'center'}` }}
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
  centerList = [],
}) => (
  <div className="listWrapper">
    <div className="listWrapperTitles">
      {
        titles.map((title, i) => (
          <span style={{ width: `${spacing[i]}%`, textAlign: `${centerList.indexOf(title) !== -1 && 'center'}` }} key={title}>
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
            { linkDistributor(datum, titles, linkTo, spacing, centerList) }
          </div>
        ))
      }
    </div>
  </div>
);

ListWrapper.propTypes = {
  titles: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  spacing: PropTypes.array.isRequired,
  linkTo: PropTypes.array,
  centerList: PropTypes.array,
};

ListWrapper.defaultProps = {
  linkTo: [],
  centerList: [],
};

export default ListWrapper;
