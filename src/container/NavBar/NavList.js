import React from 'react';
import { NavLink } from 'react-router-dom';

import HoverButton from '../../components/Button/HoverButton';


const NavList = ({ pages }) => pages.map(page => (
  <div key={page}>
    <HoverButton>
      <NavLink to={page === 'Main' ? '/' : page}>
        {page}
      </NavLink>
    </HoverButton>
  </div>
));

export default NavList;
