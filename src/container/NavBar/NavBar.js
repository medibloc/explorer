import cx from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NavList from './NavList';
import Language from '../Language';
import LanguageBox from '../Language/LanguageBox';
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
            <Fragment>
              <div className="navNavigator">
                <NavList pages={pages} />
              </div>
              <SearchBar className={cx({ fullWidth: mode !== 0 })} />
              <Language />
            </Fragment>
          ) : (
            <Fragment>
              <button className="navBarOpener" onClick={openNavBar} type="button">
                BUTTON
              </button>
              <div className={`navBarSide ${navBarOpen ? 'navBarOpen' : null}`}>
                <SearchBar className="fullWidth" />
                <div className="navBarSideMenu">
                  <img src="/image/icon/ico-all-menu.svg" alt="menu" />
                  Menu
                </div>
                <div className="navBarSideNavList">
                  <NavList pages={pages} />
                </div>
                <div className="navBarSideMenu">
                  <img src="/image/icon/ico-language.svg" alt="language" />
                  Language
                </div>
                <div className="navBarSideNavList">
                  <LanguageBox />
                </div>
              </div>
            </Fragment>
          )
        }
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
