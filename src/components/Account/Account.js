import React, { Component } from 'react';

import { accountMapper } from '../../lib';
import DetailWrapper from '../DetailWrapper';
import { BlockchainActions } from '../../redux/actionCreators';


class Account extends Component {
  componentWillMount() {
    const { address, accounts } = this.props;
    let accFound = false;
    for (let i = 0; i < accounts.length; i += 1) {
      if (accounts[i].address === address) {
        BlockchainActions.setAccount(accounts[i]);
        accFound = true;
        break;
      }
    }
    if (!accFound) BlockchainActions.getAccount(address);
    BlockchainActions.getAccountDetail(address);
  }


  render() {
    const { account, loading } = this.props;

    return account === null || loading ? (
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
