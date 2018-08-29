import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';

import Loading from '../Loading';
import QrCode from '../QrCode';
import SearchWrapper from '../SearchWrapper';
import { GlobalActions } from '../../redux/actionCreators';

import './Modal.scss';


Modal.setAppElement('#root');

const modalContent = (type, data) => {
  switch (type) {
    case 'Loading':
      return <Loading />;
    case 'QrCode':
      return <QrCode data={data} />;
    case 'Search':
      return <SearchWrapper />;
    default:
      return <div />;
  }
};

const ModalContainer = ({ modalOpen, modalType, modalData }) => (
  <div className="modal">
    <Modal
      className="modalContent"
      overlayClassName="modalOverlay"
      isOpen={modalOpen}
      onRequestClose={GlobalActions.closeModal}
      shouldCloseOnOverlayClick
    >
      { modalContent(modalType, modalData) }
    </Modal>
  </div>
);

ModalContainer.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.oneOf(['QrCode', 'Loading']),
  modalData: PropTypes.string,
};

ModalContainer.defaultProps = {
  modalType: null,
  modalData: null,
};

export default ModalContainer;
