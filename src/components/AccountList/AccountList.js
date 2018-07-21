import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListWrapper from '../ListWrapper';
import { BlockchainActions, GlobalActions } from '../../redux/actionCreators';
import Accounts from '../Accounts';
import { contentsInPage } from '../../config';
import { accountMapper, spaceMapper } from '../../lib';

import './AccountList.scss';


const accPicker = (accs, page) => accs.slice((page - 1) * contentsInPage, page * contentsInPage);

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
const linkTo = ['account/account'];

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
      mode,
    } = this.props;
    const accountList = accPicker(accounts, page);
    return loading ? (
      <div>
        LOADING
      </div>
    ) : (
      mode !== 2 ? (
        <ListWrapper
          titles={titles}
          data={mappedAccounts(accountList, totalSupply)}
          spacing={spaceMapper([5, 1, 1, 1])}
          linkTo={linkTo}
        />
      ) : (
        <div className="accountList">
          <Accounts data={mappedAccounts(accountList, totalSupply)} />
        </div>
      )
    );
  }
}

const mapStateToProps = ({ blockchain, global, widget }) => ({
  accounts: blockchain.accounts,
  totalSupply: blockchain.totalSupply,
  page: global.page,
  mode: global.mode,
  loading: widget.loading,
});

export default connect(mapStateToProps)(AccountList);
