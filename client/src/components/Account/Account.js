import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { accountMapper } from '../../lib';
import DetailWrapper from '../DetailWrapper';
import { BlockchainActions, WidgetActions as w } from '../../redux/actionCreators';


class Account extends Component {
  constructor(props) {
    super(props);
    this.callAccount = this.callAccount.bind(this);
  }

  componentDidMount() {
    this.callAccount();
  }

  shouldComponentUpdate(nextProps) {
    const { account, address, language } = this.props;
    if (address !== nextProps.address) {
      this.callAccount(nextProps);
      return true;
    }
    if (account !== nextProps.account) return true;
    if (language !== nextProps.language) return true;
    return false;
  }

  callAccount(nextProps) {
    let { address } = this.props;
    if (nextProps) {
      ({ address } = nextProps);
    }

    w.loader(BlockchainActions
      .getAccount(address)
      .then((acc) => {
        const txs = [];
        acc.account.data.txs_from.forEach(tx => txs.push(tx.data));
        acc.account.data.txs_to.forEach(tx => txs.push(tx.data));
        BlockchainActions.setTxs(txs);
      }));
  }

  render() {
    const { account } = this.props;
    return account && (
      <DetailWrapper data={accountMapper(account)} type="account" />
    );
  }
}

Account.propTypes = {
  account: PropTypes.object,
  accounts: PropTypes.array.isRequired,
  address: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

Account.defaultProps = {
  account: null,
};

export default Account;
