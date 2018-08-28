import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Accounts from '../Accounts';
import ListWrapper from '../ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import { contentsInPage } from '../../config';
import { accountMapper, spaceMapper } from '../../lib';

import './AccountList.scss';
import txMapper from "../../lib/txMapper";


const accRanger = (page, numAccounts) => {
  if (numAccounts < contentsInPage) return { from: 1, to: numAccounts };
  let from = (page - 1) * contentsInPage + 1;
  let to = page * contentsInPage;
  if (from < 1) from = 1;
  if (to < from) to = from;
  return { from, to };
}

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
  constructor(props) {
    super(props);
    this.getAccounts = this.getAccounts.bind(this);
  }

  componentWillMount() {
    this.getAccounts();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (page !== prevProps.page) this.getAccounts();
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getAccounts() {
    const { page, medState: { numAccount } } = this.props;
    const { from, to } = accRanger(page, numAccount);
    w.loader(BlockchainActions.getAccounts({ from, to }));
  }

  render() {
    const {
      accountList,
      accounts,
      mode,
      totalSupply,
    } = this.props;

    return (
      mode !== 2 ? (
        <ListWrapper
          titles={titles}
          data={mappedAccounts(accountList, totalSupply)}
          spacing={spaceMapper([8, 2, 2, 2])}
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
