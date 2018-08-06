import { connect } from 'react-redux';

import ModalContainer from './Modal';


const mapStateToProps = ({ global }) => ({
  modalData: global.modalData,
  modalOpen: global.modalOpen,
  modalType: global.modalType,
});

export default connect(mapStateToProps)(ModalContainer);
