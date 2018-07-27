import cx from 'classnames';
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
  rightList = [],
) => titles.map((title, i) => {
  let content = null;
  linkTo.forEach((link) => {
    const seperator = link.split('/');
    if (title.toLowerCase().includes(seperator[1])) {
      content = (
        <NavLink
          to={`/${seperator[0]}/${datum[title]}`}
          style={{ width: `${spacing[i]}%` }}
          className={cx({
            center: centerList.indexOf(title) !== -1 && rightList.indexOf(title) === -1,
            right: rightList.indexOf(title) !== -1,
          })}
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
        style={{ width: `${spacing[i]}%` }}
        className={cx({
          center: centerList.indexOf(title) !== -1 && rightList.indexOf(title) === -1,
          right: rightList.indexOf(title) !== -1,
        })}
        key={title}
      >
        {d[title]}
      </span>
    );
  }
  return content;
});

const ListWrapper = ({
  centerList,
  data,
  linkTo,
  rightList,
  spacing,
  titles,
}) => (
  <div className="listWrapper">
    <div className="listWrapperTitles">
      {
        titles.map((title, i) => (
          <span
            style={{ width: `${spacing[i]}%` }}
            className={cx({ center: centerList.indexOf(title) !== -1 })}
            key={title}
          >
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
            { linkDistributor(datum, titles, linkTo, spacing, centerList, rightList) }
          </div>
        ))
      }
    </div>
  </div>
);

ListWrapper.propTypes = {
  centerList: PropTypes.array,
  data: PropTypes.array.isRequired,
  linkTo: PropTypes.array,
  rightList: PropTypes.array,
  spacing: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
};

ListWrapper.defaultProps = {
  centerList: [],
  linkTo: [],
  rightList: [],
};

export default ListWrapper;
