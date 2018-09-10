import noScroll from 'no-scroll';
import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';

import Loading from '../Loading';
import QrCode from '../QrCode';
import { GlobalActions } from '../../redux/actionCreators';

import './Modal.scss';


Modal.setAppElement('#root');

const modalContent = (type, data) => {
  switch (type) {
    case 'Loading':
      return <Loading />;
    case 'QrCode':
      return <QrCode data={data} />;
    default:
      return <div />;
  }
};

const ModalContainer = ({ modalOpen, modalType, modalData }) => {
  if (modalOpen) noScroll.on();
  else noScroll.off();

  return (
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
};

ModalContainer.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.oneOf(['QrCode', 'Loading', 'Search']),
  modalData: PropTypes.string,
};

ModalContainer.defaultProps = {
  modalType: null,
  modalData: null,
};

export default ModalContainer;
