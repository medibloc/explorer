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


const pages = ['Block', 'Tx', 'Account', 'BP'];

const NavBar = ({ mode, navBarOpen, searchBarOpen }) => {
  const { openNavBar } = GlobalActions;
  if (navBarOpen) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = null;

  return (
    <div className="navBar">
      <div className="navBarContainer">
        <div className="navBarLogo">
          <NavLink to="/">
            <img src="/image/icon/logo.svg" alt="logo" />
          </NavLink>
        </div>
        {
          mode === 0 && (
            <Fragment>
              <div className="navNavigator">
                <NavList pages={pages} />
              </div>
              <SearchBar className={cx({ fullWidth: mode !== 0 })} />
              <Language />
            </Fragment>
          )
        }
        {
          mode === 1 && (
            <Fragment>
              <div className="navNavigator">
                <NavList pages={pages} />
              </div>
              <img src="/image/icon/ico-search-simple.svg" onClick={GlobalActions.openSearchBar} />
              <SearchBar />
            </Fragment>
          )
        }
        {
          mode === 2 && (
            <Fragment>
              <div className="navNavigator" />
              {
                navBarOpen && <div className="dimmer" />
              }
              <button className="navBarOpener" onClick={openNavBar} type="button">
                {
                  navBarOpen ? (
                    <img src="/image/icon/ico-close.svg" alt="opener" />
                  ) : (
                    <img src="/image/icon/ico-hamberg.svg" alt="opener" />
                  )
                }
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
  searchBarOpen: global.searchBarOpen,
  navBarOpen: global.navBarOpen,
});

export default connect(mapStateToProps)(NavBar);
