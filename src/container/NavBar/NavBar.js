import cx from 'classnames';
import React, { Fragment } from 'react';
import { Collapse } from 'react-collapse';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NavList from './NavList';
import Language from '../Language';
import SearchBar from '../SearchBar/SearchBar';
import { GlobalActions } from '../../redux/actionCreators';

import './NavBar.scss';


const pages = ['Block', 'Transaction', 'Account', 'BP'];

const NavBar = ({ mode, navBarOpen}) => {
  const { openNavBar } = GlobalActions;

  return (
    <div className="navBar">
      <div className="navBarContainer">
        <div className="navBarLogo">
          <NavLink to="/">
            <img src="/image/icon/logo.svg" alt="logo" />
          </NavLink>
        </div>
        {
          mode === 0 ? (
            <div className="navNavigator">
              <NavList pages={pages} />
            </div>
          ) : (
            <Fragment>
              <button onClick={openNavBar} type="button">
                BUTTON
              </button>
              <Collapse isOpened={navBarOpen}>
                <NavList pages={pages} />
              </Collapse>
            </Fragment>
          )
        }
        <SearchBar className={cx({ fullWidth: mode !== 0 })} />
        <Language />
      </div>
    </div>
  );
};

const mapStateToProps = ({ blockchain, global }) => ({
  medState: blockchain.medState,
  width: global.width,
  mode: global.mode,
  navBarOpen: global.navBarOpen,
});

export default connect(mapStateToProps)(NavBar);
