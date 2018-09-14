import { connect } from 'react-redux';

import ContentWrapper from './ContentWrapper';


const mapStateToProps = ({ global }) => ({
  lang: global.language,
});

export default connect(mapStateToProps)(ContentWrapper);
