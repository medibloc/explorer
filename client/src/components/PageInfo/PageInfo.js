import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import './PageInfo.scss';


const titlize = (string) => {
  let title = '';
  string.split('-').forEach((pre, i) => {
    title = `${title}${pre.charAt(0).toUpperCase()}${pre.slice(1)} `;
  });
  return title;
};

// title : block-list
const PageInfo = ({ title }) => (
  <div className="pageInfo">
    <img src={`/image/icon/ico-${title}.svg`} alt={title} />
    <FormattedMessage id={titlize(title)} />
  </div>
);

PageInfo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageInfo;
