/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { GlobalActions, BlockchainActions } from '../../redux/actionCreators';


const pages = ['ABOUT', 'BLOCK', 'HOME', 'TX'];

class NavBar extends Component {
  componentDidMount() {
    this.setWindowSize();
    BlockchainActions.subscribe();
    BlockchainActions.getMedState();
    BlockchainActions.getAccount('02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c');
  }

  setWindowSize() {
    GlobalActions.setWindowSize(window.innerWidth);
    window.addEventListener(
      'resize',
      () => GlobalActions.setWindowSize(window.innerWidth),
    );
  }


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

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(NavBar);
