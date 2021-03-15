import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import TableWithIcon from '../TableWithIcon';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import { accountListConfig, contentsInPage } from '../../config';
import { accountMapper, ranger, spaceMapper } from '../../lib';

import './accountList.scss';


const mappedAccounts = (accs, totalSupply) => {
  const accList = [];
  accs.forEach((acc) => {
    const convertedAcc = accountMapper(acc);
    convertedAcc.Percentage = `${(convertedAcc.Balance.replace(/\s|,|MED/g, '') / totalSupply * 100).toFixed(5)}%`;
    accList.push(convertedAcc);
  });
  return accList;
};

class AccountList extends Component {
  componentDidMount() {
    this.getAccounts(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { mode, page, accountList } = this.props;
    if (mode !== nextProps.mode) return true;
    if (page !== nextProps.page) return true;
    if (accountList !== nextProps.accountList) return true;
    return false;
  }

  componentWillUpdate(nextProps) {
    const { location: { search } } = this.props;
    if (nextProps.location.search !== search) {
      this.getAccounts(nextProps);
    }
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getAccounts(nextProps) {
    const props = nextProps || this.props;
    const { location: { search } } = props;
    const { page = 1 } = qs.parse(search);
    const { from, to } = ranger(page, contentsInPage);
    w.loader(BlockchainActions.getAccounts({ from, to }));
  }

  render() {
    const {
      accountList,
      mode,
      totalSupply,
      lang,
    } = this.props;

    return (
      mode !== 2 ? (
        <ListWrapper
          lang={lang}
          titles={accountListConfig.titles}
          data={mappedAccounts(accountList, totalSupply)}
          spacing={spaceMapper(accountListConfig.spaces)}
          linkTo={accountListConfig.linkTo}
        />
      ) : (
        <div className="accountList">
          <TableWithIcon
            type="account"
            data={accountList}
            totalSupply={totalSupply}
            mode={mode}
            lang={lang}
          />
        </div>
      )
    );
  }
}

AccountList.propTypes = {
  accountList: PropTypes.array,
  mode: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalSupply: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

AccountList.defaultProps = {
  accountList: [],
};

export default AccountList;
