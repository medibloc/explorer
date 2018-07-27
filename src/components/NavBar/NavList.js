import cx from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavList.scss';


const disableLink = ['tx', 'bp'];

const NavList = ({ pages, currentUrl }) => pages.map((page) => {
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
        {page}
      </NavLink>
    </div>
  );
});

export default NavList;
