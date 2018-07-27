import PropTypes from 'prop-types';
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
    const { account, address } = this.props;
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
      ({ address } = nextProps.address);
    }

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
    return account && (
      <DetailWrapper data={accountMapper(account)} type="account" />
    );
  }
}

Account.propTypes = {
  account: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  address: PropTypes.string.isRequired,
};

export default Account;
