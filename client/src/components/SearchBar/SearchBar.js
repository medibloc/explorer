import PropTypes from 'prop-types';
import React from 'react';

import { GlobalActions } from '../../redux/actionCreators';

import './SearchBar.scss';


const SearchBar = ({ modalType, search, type }) => {
  const { setSearchText, openModal } = GlobalActions;

  return (
    <div className="searchBar" id={type}>
      <div className="searchBarSearch">
        <input
          autoFocus={modalType === 'Search'}
          placeholder="Enter Address, Tx hash, Block Height"
          onClick={(e) => {
            openModal({ modalType: 'Search' });
            if (modalType !== 'Search') e.target.blur();
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={search}
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
