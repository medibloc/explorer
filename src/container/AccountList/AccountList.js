import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListWrapper from '../../components/ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import Accounts from '../Accounts';
import { blocksInPage } from '../../config';
import { accountMapper, spaceMapper } from '../../lib';


const accPicker = (accs, page) => {
  return accs.slice((page-1) * blocksInPage, page * blocksInPage);
};

const mappedAccounts = (accs, totalSupply) => {
  const accList = [];
  accs.forEach((acc) => {
    const convertedAcc = accountMapper(acc);
    convertedAcc.Percentage = `${(convertedAcc.Balance / totalSupply * 100).toFixed(5)}%`;
    accList.push(convertedAcc);
  });
  return accList;
};

const titles = ['Account', 'Balance', 'Percentage', 'Transactions'];

class AccountList extends Component {
  componentWillMount() {
    BlockchainActions.getAccounts();
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }


  render() {
    const {
      accounts,
      loading,
      totalSupply,
      page,
    } = this.props;
    const accountList = accPicker(accounts, page);
    return (
      <ListWrapper
        titles={titles}
        data={mappedAccounts(accountList, totalSupply)}
        spacing={spaceMapper([5, 1, 1, 1])}
      />
    );
  }
}

const mapStateToProps = ({ blockchain, global, widget }) => ({
  accounts: blockchain.accounts,
  totalSupply: blockchain.totalSupply,
  page: global.page,
  loading: widget.loading,
});

export default connect(mapStateToProps)(AccountList);
