import { connect } from 'react-redux';

import DetailWrapper from './DetailWrapper';


const mapStateToProps = ({ global }) => ({
  lang: global.language,
  mode: global.mode,
});

export default connect(mapStateToProps)(DetailWrapper);
