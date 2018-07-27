import { connect } from 'react-redux';

import NavBar from './NavBar';


const mapStateToProps = ({ global }) => ({
  currentUrl: global.currentUrl,
  mode: global.mode,
  navBarOpen: global.navBarOpen,
});

export default connect(mapStateToProps)(NavBar);
