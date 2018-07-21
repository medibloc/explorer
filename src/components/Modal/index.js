import { connect } from 'react-redux';

import ModalContainer from './Modal';


const mapStateToProps = ({ global }) => ({
  modalOpen: global.modalOpen,
});

export default connect(mapStateToProps)(ModalContainer);
