import React from 'react';
import SearchBar from '../SearchBar';

import './SearchWrapper.scss';


const SearchWrapper = () => (
  <div className="searchWrapper">
    <div className="searchWrapperSearchBox">
      <SearchBar type="mobile" />
    </div>
  </div>
);

export default SearchWrapper;
