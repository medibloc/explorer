import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const pages = ['ABOUT', 'BLOCK', 'HOME', 'TX'];

class NavBar extends Component {
  render() {
    return (
      <div>
        <ul>
          {
            pages.map(page => (
              <li key={page}>
                <NavLink to={page === 'HOME' ? '/' : page}>
                  { page }
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default NavBar;
