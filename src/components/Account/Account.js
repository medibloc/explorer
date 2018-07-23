import React, { Component } from 'react';

import { accountMapper } from '../../lib';
import DetailWrapper from '../DetailWrapper';
import { BlockchainActions } from '../../redux/actionCreators';


class Account extends Component {
  constructor(props) {
    super(props);
    this.callAccount = this.callAccount.bind(this);
  }

  componentDidMount() {
    this.callAccount();
  }

  shouldComponentUpdate(nextProps) {
    const { address, account } = this.props;
    if (address !== nextProps.address) {
      this.callAccount(nextProps);
      return true;
    }
    if (account !== nextProps.account) {
      return true;
    }
    return false;
  }

  callAccount(nextProps) {
    let { address } = this.props;
    const { accounts } = this.props;
    if (nextProps) {
      address = nextProps.address;
    }
    console.log(address)

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
    const { account } = this.props;
    console.log(account)
    return account && (
      <DetailWrapper data={accountMapper(account)} type="account" />
    );
  }
}

export default Account;
