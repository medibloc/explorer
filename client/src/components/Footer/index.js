import { connect } from 'react-redux';

import Footer from './Footer';


const mapStateToProps = ({ global }) => ({
  language: global.language,
  mode: global.mode,
});

export default connect(mapStateToProps)(Footer);
