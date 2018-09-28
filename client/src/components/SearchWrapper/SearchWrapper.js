import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from '../SearchBar';

import './SearchWrapper.scss';


const SearchWrapper = ({ focus }) => (
  <div className="searchWrapper">
    <div className="searchWrapperSearchBox">
      <SearchBar type="mobile" focus={focus} />
    </div>
  </div>
);

SearchWrapper.propTypes = {
  focus: PropTypes.bool,
};

SearchWrapper.defaultProps = {
  focus: false,
};

export default SearchWrapper;
