import { local } from 'medjs';
import { divider } from './bigNumCalculator';
import { txTypes } from '../config';


const {
  recoverAddCertificationPayload,
  recoverDataPayload,
  recoverDefaultPayload,
  recoverRevokeCertificationPayload,
  recoverVotePayload,
} = local.transaction;

const txMapper = (tx) => {
  const tempAmount = divider(tx.value, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Amount = `${tempAmount.join('.')} MED`;

  let payload = '';
  if (tx.payload !== '' && tx.payload !== undefined) {
    switch (tx.tx_type) {
      case txTypes.ADD_CERTIFICATION:
        payload = recoverAddCertificationPayload(tx.payload);
        break;
      case txTypes.DATA_UPLOAD:
        payload = recoverDataPayload(tx.payload).hash;
        break;
      case txTypes.REVOKE_CERTIFICATION:
        payload = recoverRevokeCertificationPayload(tx.payload);
        break;
      case txTypes.VALUE_TRANSFER:
        payload = recoverDefaultPayload(tx.payload).message.slice(1, -1);
        break;
      case txTypes.VOTE:
        payload = recoverVotePayload(tx.payload);
        break;
      default:
        break;
    }
  }

  return {
    'Transaction Hash': tx.hash,
    Status: tx.executed ? 'Confirm' : 'Pending',
    'Time Stamp': tx.timestamp,
    From: tx.from,
    To: tx.to,
    Type: tx.tx_type,
    Amount,
    Message: payload,
    Nonce: tx.nonce,
    Signature: tx.sign,
  };
};

export default txMapper;
