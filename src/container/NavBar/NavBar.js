/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar';
import TextBox from '../../components/Text/TextBox';
import HoverButton from '../../components/Button/HoverButton';
import { GlobalActions, BlockchainActions, TickerActions } from '../../redux/actionCreators';


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
    // const { mode } = this.props;

    return (
      <div className="navBar">
        <SearchBar />
        <ul className="navNavigator">
          {
            pages.map(page => (
              <li key={page}>
                <HoverButton>
                  <NavLink to={page === 'Main' ? '/' : page}>
                   {page}
                  </NavLink>
                </HoverButton>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  width: global.width,
  mode: global.mode,
});

export default connect(mapStateToProps)(NavBar);
