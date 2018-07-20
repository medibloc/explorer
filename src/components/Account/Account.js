import React, { Component } from 'react';

import { accountMapper } from '../../lib';
import DetailWrapper from '../DetailWrapper';
import { BlockchainActions } from '../../redux/actionCreators';


class Account extends Component {
  componentWillMount() {
    const { address } = this.props;
    if (!address) BlockchainActions.getAccount(address);
  }

  render() {
    const { account, loading } = this.props;

    return account === null ? (
      <div>
        LOADING
      </div>
    ) : (
      <div>
        <DetailWrapper data={accountMapper(account)} type="account" />
      </div>
    );
  }
}

export default Account;
