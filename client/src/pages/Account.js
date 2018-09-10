import PropTypes from 'prop-types';
import React from 'react';

import AccountContainer from '../components/Account';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';
import TxList from '../components/TxList';


const Account = ({ location }) => {
  const subject = location.pathname.split('/')[2];
  const AccountWrapper = <AccountContainer address={subject} />;

  return (
    <div className="account">
      <div className="accountDetail">
        <PageInfo title="account-detail" />
        { AccountWrapper }
      </div>
      <div className="blockDetailTx">
        <PageInfo title="transactions-list" />
        <TxList type="account" address={subject} />
      </div>
      <div className="contentNavigation">
        <Navigation type="account" />
      </div>
    </div>
  );
};

Account.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Account;
