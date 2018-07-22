import React from 'react';

import PageInfo from '../components/PageInfo';
import AccountContainer from '../components/Account';
import TxList from '../components/TxList';
import { subjectDistinguisher } from '../lib';


const Account = ({ location }) => {
  const subject = location.pathname.split('/')[2];
  const type = subjectDistinguisher(subject);

  let AccountWrapper = <AccountContainer />;
  if (type === 'account') {
    AccountWrapper = <AccountContainer address={subject} />;
  }

  return (
    <div className="account">
      <div className="accountDetail">
        <PageInfo title="account-detail" />
        { AccountWrapper }
      </div>
      <div className="blockDetailTx">
        <PageInfo title="transactions-list" />
        <TxList type="account" />
      </div>
    </div>
  );
};

export default Account;
