import { connect } from 'react-redux';

import SearchWrapper from './SearchWrapper';


const mapStateToProps = ({ global }) => ({
  searchResult: global.searchResult,
});

export default connect(mapStateToProps)(SearchWrapper);
