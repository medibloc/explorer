import { connect } from 'react-redux';

import Language from './Language';


const mapStateToProps = ({ global }) => ({
  language: global.language,
  languageOpen: global.languageOpen,
});

export default connect(mapStateToProps)(Language);
