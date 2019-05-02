import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import './ContentWrapper.scss';


const titleConverter = (title) => {
  let convertedTitle = title.split(' ')[0].toLowerCase();
  if (title.split(' ')[1]) convertedTitle += title.split(' ')[1];
  return convertedTitle;
};

const ContentWrapper = ({ lang, mode, type, data, titles }) => {
  const { 'Block Height': height } = data;
  let hash = '';
  titles.forEach((title) => {
    const ti = title.toLowerCase();
    if (ti.includes('hash')) hash = data[title];
    if (ti.includes('number')) hash = data[title];
    if (ti.includes('account')) hash = data[title];
  });
  const url = (type === 'bp') ? `/${lang}/account/${hash}` : `/${lang}/${type}/${hash}`;


  return (
    <NavLink to={url} className={cx('contentWrapperLinker', { special: (data.Ranking >= 1 && data.Ranking <= 21), mobile: mode === 2 })}>
      <div className="contentWrapper">
        {
          mode === 0 && (
            <div className="contentWrapperIcon">
              <img src={`/image/icon/ico-${type}.svg`} alt="contentWrapperIcon" />
              <img src={`/image/icon/ico-${type}-on.svg`} alt="contentWrapperIcon" />
              <span>
                { height }
              </span>
            </div>
          )
        }
        <div className={cx('contentWrapperInfoTitle', { mobile: mode === 2 })}>
          {
            titles.map(title => (
              <span key={title}>
                <FormattedMessage id={titleConverter(title)} />
              </span>
            ))
          }
        </div>
        <div className="contentWrapperInfoContent">
          {
            titles.map(title => (
              <span className={title === 'Time Stamp' ? 'special' : null} key={title}>
                {data[title]}
              </span>
            ))
          }
        </div>
      </div>
    </NavLink>
  );
};

ContentWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  titles: PropTypes.array.isRequired,
};

export default ContentWrapper;
