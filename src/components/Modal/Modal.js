import React from 'react';
import Modal from 'react-modal';

import { GlobalActions } from '../../redux/actionCreators';

import './Modal.scss';


Modal.setAppElement('#root');

const ModalContainer = ({ children, modalOpen }) => (
  <div className="modal">
    <Modal
      className="modalContent"
      overlayClassName="modalOverlay"
      isOpen={modalOpen}
      onRequestClose={GlobalActions.openModal}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  </div>
);

export default ModalContainer;
