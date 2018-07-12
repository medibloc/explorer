import cx from 'classnames';
import React, { Component, Fragment } from 'react';
import { Collapse } from 'react-collapse';
import { connect } from 'react-redux';

import NavList from './NavList';
import SearchBar from '../SearchBar/SearchBar';
import { GlobalActions } from '../../redux/actionCreators';

import './NavBar.scss';


const pages = ['Main', 'blocks', 'txs', 'accounts', 'bp'];

class NavBar extends Component {
  render() {
    const { mode, navBarOpen } = this.props;
    const { openNavBar } = GlobalActions;

    return (
      <div className="navBar">
        <div>
          LOGO
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
