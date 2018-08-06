import React, { Fragment } from 'react';

import AccountList from '../components/AccountList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const Accounts = () => (
  <Fragment>
    <PageInfo title="account-list" />
    <div className="accountsContents">
      <AccountList />
    </div>
    <div className="accountsNavigation">
      <Navigation type="accounts" />
    </div>
  </Fragment>
);

export default Accounts;
