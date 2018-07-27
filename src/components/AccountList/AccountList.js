import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Accounts from '../Accounts';
import ListWrapper from '../ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import { contentsInPage } from '../../config';
import { accountMapper, spaceMapper } from '../../lib';

import './AccountList.scss';


const accPicker = (accs, page) => accs.slice((page - 1) * contentsInPage, page * contentsInPage);

const mappedAccounts = (accs, totalSupply) => {
  const accList = [];
  accs.forEach((acc) => {
    const convertedAcc = accountMapper(acc);
    convertedAcc.Percentage = `${(convertedAcc.Balance.replace(/\s|,|MED/g, '') / totalSupply * 100).toFixed(5)}%`;
    accList.push(convertedAcc);
  });
  return accList;
};

const titles = ['Account', 'Balance', 'Percentage', 'Transactions'];
const linkTo = ['account/account'];

class AccountList extends Component {
  componentDidMount() {
    w.loader(BlockchainActions.getAccounts());
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  render() {
    const {
      accounts,
      mode,
      page,
      totalSupply,
    } = this.props;
    const accountList = accPicker(accounts, page);

    return (
      mode !== 2 ? (
        <ListWrapper
          titles={titles}
          data={mappedAccounts(accountList, totalSupply)}
          spacing={spaceMapper([8, 2, 1, 1])}
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

AccountList.propTypes = {
  accounts: PropTypes.array.isRequired,
  mode: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalSupply: PropTypes.number.isRequired,
};

export default AccountList;
