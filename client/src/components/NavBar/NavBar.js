import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Language from '../Language';
import LanguageBox from '../Language/LanguageBox';
import Modal from '../Modal';
import NavList from './NavList';
import SearchBar from '../SearchBar';
import { GlobalActions } from '../../redux/actionCreators';
import { navbarPages } from '../../config';

import './NavBar.scss';


const NavBar = ({
  currentUrl,
  lang,
  mode,
  navBarOpen,
}) => {
  const { openNavBar, closeNavBar } = GlobalActions;

  return (
    <div className={cx('navBar', { mobile: mode === 2, tablet: mode >= 1 })}>
      <Modal />
      <div className="navBarContainer">
        {
          mode === 0 && (
            <div className="navBarLogo">
              <NavLink to={`/${lang}/`}>
                <img src="/image/icon/logo.svg" alt="logo" />
              </NavLink>
            </div>
          )
        }
        {
          mode === 0 ? (
            <Fragment>
              <div className="navNavigator">
                <NavList pages={navbarPages} currentUrl={currentUrl} lang={lang} />
              </div>
              <SearchBar className={cx({ fullWidth: mode !== 0 })} type="top" />
              <Language />
            </Fragment>
          ) : (
            <Fragment>
              <div className="navNavigator" />
              {
                // eslint-disable-next-line
                navBarOpen && <div className="dimmer" onClick={closeNavBar} />
              }
              <button className="navBarOpener" type="button" onClick={navBarOpen ? closeNavBar : openNavBar}>
                {
                  navBarOpen ? (
                    // eslint-disable-next-line
                    <img src="/image/icon/ico-close.svg" alt="opener" />
                  ) : (
                  // eslint-disable-next-line
                    <img src="/image/icon/ico-hamberg.svg" alt="opener" />
                  )
                }
              </button>
              <div className={`navBarSide ${navBarOpen ? 'navBarOpen' : 'navBarClose'}`}>
                {/*<SearchBar className="fullWidth" type="side" />*/}
                <div className="navBarSideMenu">
                  <img src="/image/icon/ico-all-menu.svg" alt="menu" />
                  Menu
                </div>
                <div className="navBarSideNavList">
                  <NavList pages={navbarPages} currentUrl={currentUrl} lang={lang} />
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
        {
          mode !== 0 && (
            <Fragment>
              <div className="navBarLogo">
                <NavLink to={`/${lang}/`}>
                  <img src="/image/icon/logo.svg" alt="logo" />
                </NavLink>
              </div>
              <button className="searchBtn" onClick={() => GlobalActions.openModal({ modalType: 'Search' })}>
                <img src="/image/icon/ico-search-s-black.svg" alt="search" />
              </button>
            </Fragment>
          )
        }
      </div>
    </div>
  );
};

NavBar.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  navBarOpen: PropTypes.bool.isRequired,
};

export default NavBar;
