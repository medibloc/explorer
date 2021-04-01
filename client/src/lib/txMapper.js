import { divider } from './bigNumCalculator';

const txMapper = (tx) => {
  const tempAmount = divider(tx.amount, [10 ** 6], 6).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Amount = `${tempAmount.join('.')} MED`;
  let { txHash } = tx;
  let msgId = '0';
  if (new RegExp(':\\d+$').test(tx.txHash)) {
    const colonIndex = tx.txHash.lastIndexOf(':');
    txHash = tx.txHash.slice(0, colonIndex);
    msgId = tx.txHash.slice(colonIndex + 1);
  }

  return {
    'Block Height': tx.blockHeight,
    'Transaction Hash': txHash,
    'Transaction MsgId': msgId,
    Status: tx.executed ? 'Success' : 'Fail',
    From: tx.fromAccount,
    To: tx.toAccount,
    Type: tx.type ? tx.type.split('/')[1] : '',
    Amount,
    Memo: tx.memo,
    // Nonce: tx.nonce,
    // Signature: tx.sign,
  };
};

export default txMapper;
