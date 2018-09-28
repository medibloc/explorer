import { connect } from 'react-redux';

import SearchBar from './SearchBar';


const mapStateToProps = ({ global }) => ({
  modalType: global.modalType,
  search: global.search,
  searchFrom: global.searchFrom,
  searchResult: global.searchResult,
});

export default connect(mapStateToProps)(SearchBar);
