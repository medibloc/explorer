import BigNumber from 'bignumber.js';

export const blockConverter = (data) => {
  try {
    return ({
      height: +data.block.header.height,
      timestamp: data.block.header.time,
      hash: data.block_meta ? data.block_meta.block_id.hash : null,
      prevHash: data.block.header.last_block_id.hash,
      txs: data.block.data.txs || [],
      validator: data.block.header.proposer_address,
    });
  } catch (e) {
    return ({});
  }
};

export const txConverter = (data) => {
  try {
    return data.tx.value.msg.map((m, i) => {
      let amount = null;
      let fromAccount = null;
      let toAccount = null;

      switch (m.type) {
        case 'cosmos-sdk/MsgBeginRedelegate':
        case 'cosmos-sdk/MsgUndelegate':
        case 'cosmos-sdk/MsgDelegate':
          fromAccount = m.value.delegator_address;
          ({ amount } = m.value.amount);
          break;
        case 'cosmos-sdk/MsgWithdrawDelegationReward':
          fromAccount = m.value.delegator_address;
          break;
        case 'cosmos-sdk/MsgCreateValidator':
          fromAccount = m.value.delegator_address;
          ({ amount } = m.value.value);
          break;
        case 'cosmos-sdk/MsgSend':
          fromAccount = m.value.from_address;
          toAccount = m.value.to_address;
          amount = m.value.amount ? m.value.amount[0].amount : 0;
          break;
        case 'aol/MsgCreateTopic':
        case 'aol/MsgAddWriter':
        case 'aol/MsgDeleteWriter':
        case 'aol/MsgAddRecord':
          fromAccount = m.value.owner_address;
          break;
        case 'did/MsgCreateDID':
        case 'did/MsgUpdateDID':
        case 'did/MsgDeactivateDID':
          fromAccount = m.value.from_address;
          break;
        case 'token/MsgIssueToken':
          fromAccount = m.value.owner_address;
          break;
        default:
          break;
      }

      return ({
        blockHeight: +data.height,
        executed: data.logs[0].success,
        fromAccount,
        toAccount,
        onChain: true,
        txHash: `${data.txhash}:${i}`,
        type: m.type,
        memo: data.tx.value.memo,
        amount,
      });
    });
  } catch (e) {
    return ({});
  }
};

export const balanceConverter = (data) => {
  try {
    return data[0].amount;
  } catch (e) {
    return null;
  }
};

export const stakingConverter = (data) => {
  try {
    return data.reduce((acc, d) => acc.plus(new BigNumber(d.shares)), new BigNumber('0'));
  } catch (e) {
    return null;
  }
};

export const totalSupplyConverter = (data) => {
  return {
    notBondedTokens: 0,
    bondedTokens: 0,
    totalSupply: data[0].amount,
  };
};
