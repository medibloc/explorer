import React, { Fragment } from 'react';

import AccountList from '../components/AccountList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const Accounts = props => (
  <Fragment>
    <PageInfo title="account-list" />
    <div className="accountsContents">
      <AccountList {...props} />
    </div>
    <div className="accountsNavigation">
      <Navigation type="accounts" />
    </div>
  </Fragment>
);

export default Accounts;
