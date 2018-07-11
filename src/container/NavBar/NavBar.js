/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import { connect } from 'react-redux';

import NavList from './NavList';
import SearchBar from '../SearchBar/SearchBar';
import {
  GlobalActions,
  BlockchainActions,
  TickerActions,
  WidgetActions,
} from '../../redux/actionCreators';

import './NavBar.scss';


const pages = ['Main', 'BLOCK', 'TX', 'Account', 'BP', 'Search', 'Setting'];

class NavBar extends Component {
  componentWillMount() {
    WidgetActions.load();
    BlockchainActions.getMedState();
  }

  componentDidMount() {
    this.setWindowSize();
    BlockchainActions.subscribe();
    TickerActions.getMedPrice();
  }

  componentWillReceiveProps(nextProps) {
    const { medState } = this.props;
    if (nextProps.medState !== medState) {
      WidgetActions.loadSuccess();
    }
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

const mapStateToProps = ({ blockchain, global }) => ({
  medState: blockchain.medState,
  width: global.width,
  mode: global.mode,
  navBarOpen: global.navBarOpen,
});

export default connect(mapStateToProps)(NavBar);
