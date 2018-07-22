import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavList.scss';


const NavList = ({ pages, currentUrl }) => pages.map((page) => {
  const PAGE = page === 'Transaction' ? 'tx' : page.toLowerCase();
  return (
    <div key={page}>
      <NavLink
        className={`navListBtn ${currentUrl.indexOf(PAGE) !== -1 && 'selected'}`}
        to={`/${PAGE}s`}
      >
        {page}
      </NavLink>
    </div>
  );
});

export default NavList;
