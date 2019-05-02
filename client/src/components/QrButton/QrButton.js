import React from 'react';
import PropTypes from 'prop-types';
import { GlobalActions } from '../../redux/actionCreators';

import './QrButton.scss';

const QrButton = ({ modalData }) => (
  <button
    type="button"
    onClick={() => GlobalActions.openModal({ modalData, modalType: 'QrCode' })}
  >
    <img
      src="/image/icon/ico-qr.png"
      alt="qr"
    />
  </button>
);

QrButton.propTypes = {
  modalData: PropTypes.string.isRequired,
};

export default QrButton;
