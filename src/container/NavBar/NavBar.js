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
