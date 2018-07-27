import PropTypes from 'prop-types';
import QR from 'qrcode';
import React, { Component } from 'react';

import { GlobalActions } from '../../redux/actionCreators';

import './QrCode.scss';


const qrConverter = (message, canvas) => {
  QR.toCanvas(
    canvas,
    message,
    {
      errorCorrectionLevel: 'H',
    },
    (err) => {
      if (err) throw new Error(err);
    },
  );
};

class QrCode extends Component {
  componentDidMount() {
    const { data } = this.props;
    const canvas = document.getElementById('qrCanvas');
    qrConverter(data, canvas);
  }

  render() {
    return (
      <div className="qrCode">
        <div className="qrCodeTitle">
          QR code
          <button type="button" onClick={GlobalActions.closeModal}>
            <img
              src="/image/icon/ico-close.svg"
              alt="close"
            />
          </button>
        </div>
        <div className="qrCodeContent">
          <canvas id="qrCanvas" />
        </div>
      </div>
    );
  }
}

QrCode.propTypes = {
  data: PropTypes.string.isRequired,
};

export default QrCode;
