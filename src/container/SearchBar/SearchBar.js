import React from 'react';
import { connect } from 'react-redux';

import './SearchBar.scss';
import HoverButton from '../../components/Button/HoverButton';
import { GlobalActions } from '../../redux/actionCreators';

const SearchBar = () => {
  const { setSearchText } = GlobalActions;

  return (
    <div className="searchBar">
      <div className="searchBarSearch">
        <input placeholder="Enter Address, Tx hash, BLock Height" onChange={e => setSearchText(e.target.value)} />
        <div className="searchBarIcon">
          <img src="/image/icon/ico-search-s-black.svg" alt="searchLogo" />
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = ({ global }) => ({
  mode: global.mode,
  search: global.search,
});

export default connect(mapStateToProps)(SearchBar);
