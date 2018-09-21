import { connect } from 'react-redux';

import ContentWrapper from './ContentWrapper';


const mapStateToProps = ({ global }) => ({
  lang: global.language,
  mode: global.mode,
});

export default connect(mapStateToProps)(ContentWrapper);
