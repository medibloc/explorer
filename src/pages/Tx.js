import React from 'react';

import PageInfo from '../components/PageInfo';
import TxContainer from '../components/Tx';
import { subjectDistinguisher } from '../lib';


const Tx = ({ location }) => {
  const subject = location.pathname.split('/')[2];
  const type = subjectDistinguisher(subject);

  let TxWrapper = <TxContainer />;
  if (type === 'hash') {
    TxWrapper = <TxContainer hash={subject} />;
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
