import { local } from 'medjs';
import { divider } from './bigNumCalculator';
import { txTypes } from '../config';


const {
  recoverPayloadWithType,
} = local.transaction;

const txMapper = (tx) => {
  const tempAmount = divider(tx.value, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Amount = `${tempAmount.join('.')} MED`;

  let payload = '';
  if (tx.payload !== '' && tx.payload !== undefined) {
    const recoveredPayload = recoverPayloadWithType(tx.payload, tx.tx_type);

    switch (tx.tx_type) {
      case txTypes.ADD_CERTIFICATION:
        payload = recoveredPayload;
        break;
      case txTypes.DATA_UPLOAD:
        payload = Buffer.from(recoveredPayload.hash).toString('hex');
        break;
      case txTypes.REVOKE_CERTIFICATION:
        payload = recoveredPayload;
        break;
      case txTypes.VALUE_TRANSFER:
        payload = recoveredPayload.message;
        break;
      case txTypes.VOTE:
        payload = JSON.stringify(recoveredPayload.candidates.map(cid => Buffer.from(cid).toString('hex')));
        break;
      default:
        break;
    }
  }

  return {
    'Block Height': tx.block_height,
    'Transaction Hash': tx.hash,
    Status: tx.on_chain ? (tx.receipt && tx.receipt.executed ? 'Success' : 'Fail') : 'Pending',
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
