import PropTypes from 'prop-types';
import React from 'react';

import SimpleWrapper from '../SimpleWrapper';
import { GlobalActions } from '../../redux/actionCreators';

import './SearchBar.scss';


const SearchBar = ({
  focus = false,
  searchFrom,
  searchResult,
  type,
}) => {
  const { setSearchText } = GlobalActions;

  return (
    <div className="searchBar" id={type}>
      <div className="searchBarSearch">
        <input
          autoFocus={focus} // eslint-disable-line
          placeholder="Enter Address, Tx hash, Block Height"
          onClick={() => {
            if (type === 'side') GlobalActions.openModal({ modalType: 'Search' });
          }}
          onChange={(e) => {
            setSearchText(e.target.value, type);
          }}
          onBlur={(e) => {
            e.target.value = '';
          }}
        />
        <div className="searchBarIcon">
          {
            type === 'mobile' ?
              <img
                src="/image/icon/back-btn.svg"
                alt="backBtn"
                onClick={GlobalActions.closeModal}
              />
              : <img src={`/image/icon/ico-search-s${type === 'main' ? '' : '-black'}.svg`} alt="searchLogo" />
          }
        </div>
      </div>
      <SimpleWrapper data={searchResult} searchFrom={searchFrom} type={type} />
    </div>
  );
};

SearchBar.propTypes = {
  focus: PropTypes.bool,
  searchFrom: PropTypes.string.isRequired,
  searchResult: PropTypes.array,
  type: PropTypes.string,
};

SearchBar.defaultProps = {
  focus: false,
  searchResult: [],
  type: null,
};

export default SearchBar;
