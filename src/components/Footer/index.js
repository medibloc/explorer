import { connect } from 'react-redux';

import Footer from './Footer';


const mapStateToProps = ({ global }) => ({
  mode: global.mode,
});

export default connect(mapStateToProps)(Footer);
