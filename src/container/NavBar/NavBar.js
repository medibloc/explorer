/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import { connect } from 'react-redux';

import NavList from './NavList';
import SearchBar from '../SearchBar/SearchBar';
import { GlobalActions, BlockchainActions, TickerActions } from '../../redux/actionCreators';

import './NavBar.scss';


const pages = ['Main', 'BLOCK', 'TX', 'Address', 'BP', 'Search', 'Setting'];

class NavBar extends Component {
  componentDidMount() {
    this.setWindowSize();
    BlockchainActions.subscribe();
    TickerActions.getMedPrice();
  }

  setWindowSize() {
    GlobalActions.setWindowSize(window.innerWidth);
    window.addEventListener(
      'resize',
      () => GlobalActions.setWindowSize(window.innerWidth),
    );
  }

  render() {
    const { handleNavBar } = this;
    const { mode, navBarOpen } = this.props;
    const { openNavBar } = GlobalActions;

    return (
      <div className="navBar">
        <SearchBar />
        {
          mode === 0 ? (
            <div className="navNavigator">
              <NavList pages={pages} />
            </div>
          ) : (
            <div>
              <button onClick={openNavBar} type="button">
                BUTTON
              </button>
              <Collapse isOpened={navBarOpen}>
                <NavList pages={pages} />
              </Collapse>
            </div>
          )
        }

      </div>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  width: global.width,
  mode: global.mode,
  navBarOpen: global.navBarOpen,
});

export default connect(mapStateToProps)(NavBar);
