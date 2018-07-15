import React from 'react';
import { NavLink } from 'react-router-dom';

import HoverButton from '../../components/Button/HoverButton';

import './NavList.scss';


const NavList = ({ pages }) => pages.map(page => (
  <div key={page}>
    <HoverButton>
      <NavLink className="navListBtn" to={page === 'Main' ? '/' : `${page}s`}>
        {page}
      </NavLink>
    </HoverButton>
  </div>
));

export default NavList;
