import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

import './SearchBar.scss';
import HoverButton from '../../components/Button/HoverButton';
import { GlobalActions } from '../../redux/actionCreators';

const SearchBar = ({ mode }) => {
  const { setSearchText } = GlobalActions;

  return (
    <div className={cx('searchBar', { tablet: mode !== 0 })}>
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
