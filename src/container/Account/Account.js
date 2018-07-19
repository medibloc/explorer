import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BlockchainActions } from '../../redux/actionCreators';
import { accountMapper } from '../../lib';
import DetailWrapper from '../../components/DetailWrapper';


class Account extends Component {
  componentWillMount() {
    const { address } = this.props;
    if (address !== undefined) BlockchainActions.getAccount(address);
  }


  render() {
    const { account } = this.props;
    const keyList = ['Account', 'Balance', 'Transactions'];
    return account === null ? (
      <div>
        LOADING
      </div>
    ) : (
      <div>
        <DetailWrapper data={accountMapper(account)} keyList={keyList} />
      </div>
    );
  }
}

const mapStateToProps = ({ blockchain }) => ({
  account: blockchain.account,
});

export default connect(mapStateToProps)(Account);
