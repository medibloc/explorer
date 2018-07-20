import React from 'react';

import PageInfo from '../components/PageInfo';
import AccountContainer from '../components/Account';
import TxList from '../components/TxList';
import { subjectDistinguisher } from '../lib';


const Account = ({ location }) => {
  const subject = location.pathname.split('/')[1];
  const type = subjectDistinguisher(subject);

  let AccountWrapper = null;
  if (type === 'address') {
    AccountWrapper = <AccountContainer address={subject} />;
  } else {
    AccountWrapper = <AccountContainer />;
  }

  return (
    <div className="account">
      <div className="accountDetail">
        <PageInfo title="account-detail" />
        { AccountWrapper }
      </div>
      <div className="blockDetailTx">
        <PageInfo title="transactions-list" />
        <TxList />
      </div>
    </div>
  );
};

export default Account;
