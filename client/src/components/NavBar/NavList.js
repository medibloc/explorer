import cx from 'classnames';
import React from 'react';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import './NavList.scss';


const disableLink = ['tx'];

const NavList = ({ currentUrl, intl, pages }) => pages.map((page) => {
  const PAGE = page === 'Transaction' ? 'tx' : page.toLowerCase();
  return (
    <div key={page}>
      <NavLink
        className={cx(
          'navListBtn',
          {
            navSelected: currentUrl.indexOf(PAGE) !== -1,
            navDisabled: disableLink.indexOf(PAGE) !== -1,
          },
        )}
        to={`/${PAGE}s`}
        disabled="disabled"
      >
        { intl.formatMessage({ id: PAGE }) }
      </NavLink>
    </div>
  );
});

export default injectIntl(NavList);
