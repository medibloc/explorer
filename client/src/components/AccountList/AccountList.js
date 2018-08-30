import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import { contentsInPage } from '../../config';
import { accountMapper, spaceMapper } from '../../lib';

import './AccountList.scss';
import TableWithIcon from "../TableWithIcon/TableWithIcon";


const accRanger = (page, numAccounts) => {
  if (numAccounts < contentsInPage) return { from: 1, to: numAccounts };
  let from = (page - 1) * contentsInPage;
  let to = page * contentsInPage - 1;
  if (from < 0) from = 0;
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
          {/*<Accounts data={accountList} />*/}
          <TableWithIcon type="account" data={accountList} totalSupply={totalSupply} />
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
