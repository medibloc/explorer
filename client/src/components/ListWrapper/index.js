import { connect } from 'react-redux';

import ListWrapper from './ListWrapper';


const mapStateToProps = ({ global }) => ({
  lang: global.language,
});

export default connect(mapStateToProps)(ListWrapper);
