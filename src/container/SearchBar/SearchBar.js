import React from 'react';
import { connect } from 'react-redux';

import './SearchBar.scss';
import HoverButton from '../../components/Button/HoverButton';
import { GlobalActions } from '../../redux/actionCreators';

const SearchBar = ({}) => {
  const { setSearchText } = GlobalActions;

  return (
    <div className="searchBar">
      <input onChange={e => setSearchText(e.target.value)} />
      <HoverButton>
        GO
      </HoverButton>
    </div>
  );
};


const mapStateToProps = ({ global }) => ({
  mode: global.mode,
  search: global.search,
});

export default connect(mapStateToProps)(SearchBar);
