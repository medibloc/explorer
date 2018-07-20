import React from 'react';

import PageInfo from '../components/PageInfo';
import TxContainer from '../components/Tx';
import { subjectDistinguisher } from '../lib';


const Tx = ({ location }) => {
  const subject = location.pathname.split('/')[1];
  const type = subjectDistinguisher(subject);

  let TxWrapper = null;
  if (type === 'hash') {
    TxWrapper = <TxContainer hash={subject} />;
  } else {
    TxWrapper = <TxContainer />;
  }

  return (
    <div className="tx">
      <div className="txDetail">
        <PageInfo title="transaction-detail-info" />
        { TxWrapper }
      </div>
    </div>
  );
};

export default Tx;
