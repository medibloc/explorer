import { connect } from 'react-redux';

import PageInfo from './PageInfo';


const mapStateToProps = ({ global }) => ({
  mode: global.mode,
});

export default connect(mapStateToProps)(PageInfo);
