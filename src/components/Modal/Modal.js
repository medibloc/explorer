import React from 'react';
import Modal from 'react-modal';

import QrCode from '../QrCode';
import { GlobalActions } from '../../redux/actionCreators';

import './Modal.scss';


Modal.setAppElement('#root');

const modalContent = (type, data) => {
  switch (type) {
    case 'QrCode':
      return <QrCode data={data} />;
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
      onRequestClose={GlobalActions.openModal}
      shouldCloseOnOverlayClick={true}
    >
      { modalContent(modalType, modalData) }
    </Modal>
  </div>
);

export default ModalContainer;
