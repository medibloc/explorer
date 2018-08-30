import React  from 'react';
import SearchBar from '../SearchBar';
import SearchBox from '../SearchBox';

import './SearchWrapper.scss';


const SearchWrapper = ({ searchResult }) => (
  <div className="searchWrapper">
    <div className="searchWrapperSearchBox">
      <SearchBar type="main" />
    </div>
    <div className="searchWrapperResultBox">
      {
        searchResult.map((res, i) => {
          let type = '';
          if ('tx_type' in res) {
            type = 'tx';
          } else if ('parent_hash' in res) {
            type = 'block';
          } else {
            type = 'acc';
          }
          return <SearchBox data={res} type={type} key={i} />
        })
      }
    </div>
  </div>
);

export default SearchWrapper;
