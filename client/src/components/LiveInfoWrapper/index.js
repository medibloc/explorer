import { connect } from 'react-redux';

import LiveInfoWrapper from './LiveInfoWrapper';


const mapStateToProps = ({ global }) => ({
  lang: global.language,
});

export default connect(mapStateToProps)(LiveInfoWrapper);
