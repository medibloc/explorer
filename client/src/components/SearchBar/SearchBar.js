import PropTypes from 'prop-types';
import React from 'react';

import { GlobalActions } from '../../redux/actionCreators';

import './SearchBar.scss';


const SearchBar = ({ type }) => {
  const { setSearchText } = GlobalActions;

  return (
    <div className="searchBar" id={type}>
      <div className="searchBarSearch">
        <input
          placeholder="Enter Address, Tx hash, Block Height"
          onChange={e => setSearchText(e.target.value)}
          disabled
        />
        <div className="searchBarIcon">
          <img src={`/image/icon/ico-search-s${type ? '' : '-black'}.svg`} alt="searchLogo" />
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  type: PropTypes.string,
};

SearchBar.defaultProps = {
  type: null,
};

export default SearchBar;
