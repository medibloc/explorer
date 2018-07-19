import React from 'react';

import Layout from './Layout';
import AccountList from '../container/AccountList';
import Navigation from '../container/Navigation';
import PageInfo from '../components/PageInfo';


const Accounts = () => (
  <Layout>
    <PageInfo title="account-list" />
    <div className="accountsContents">
      <AccountList />
    </div>
    <div className="accountsNavigation">
      <Navigation type="account" />
    </div>
  </Layout>
);

export default Accounts;
