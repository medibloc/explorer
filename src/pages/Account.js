import React from 'react';

import Layout from './Layout';
import PageInfo from '../components/PageInfo';
import AccountContainer from '../container/Account';
import TxList from '../container/TxList';


const Account = ({ location }) => {
  const step = location.pathname.split('/');
  let AccountWrapper = null;
  if (step[2] === 'hash') {
    AccountWrapper = <AccountContainer address={step[3]} />;
  } else {
    AccountWrapper = <AccountContainer />;
  }

  return (
    <Layout>
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
    </Layout>
  );
};

export default Account;
