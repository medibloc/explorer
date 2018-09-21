import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import './LiveInfoWrapper.scss';


const LiveInfoWrapper = ({
  lang,
  mode,
  title,
  type,
  children,
}) => (
  <div className={cx('liveInfoWrapper', { mobile: mode !== 0 })}>
    <div className="liveInfoWrapperInfo">
      <span>
        {title}
      </span>
      <NavLink to={`/${lang}/${type}s`}>
        <button type="button">
          {
            mode === 2 ? (
              <img src="/image/icon/add.svg" alt="more" />
            ) : (
              <FormattedMessage id="viewAll" />
            )
          }
        </button>
      </NavLink>
    </div>
    <div className="liveInfoWrapperContentBox">
      {children}
    </div>
  </div>
);

LiveInfoWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default LiveInfoWrapper;
