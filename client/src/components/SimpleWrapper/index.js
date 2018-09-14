import { connect } from 'react-redux';

import SimpleWrapper from './SimpleWrapper';


const mapStateToProps = ({ global }) => ({
  lang: global.language,
});

export default connect(mapStateToProps)(SimpleWrapper);
