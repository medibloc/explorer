import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContentBox from '../../components/ContentBox/ContentBox';
import { BlockchainActions, WidgetActions } from '../../redux/actionCreators';

class Accounts extends Component {
  componentWillMount() {
    WidgetActions.load();
    BlockchainActions.getAccounts();
  }

  componentWillReceiveProps(nextProps) {
    const { accounts } = this.props;
    if (nextProps.accounts !== accounts) WidgetActions.loadSuccess();
  }

  render() {
    const { accounts, loading } = this.props;

    return loading ? (
      <div>
        LOADING
      </div>)
      : (
        <div>
          Here is the account sound!!
          <ul>
            {
              accounts.map(account => (
                <li>
                  <ContentBox>
                    {JSON.stringify(account)}
                  </ContentBox>
                </li>
              ))
            }
          </ul>
        </div>
      );
  }
}


const mapStateToProps = ({ blockchain, widget }) => ({
  accounts: blockchain.accounts,
  loading: widget.loading,
});

export default connect(mapStateToProps)(Accounts);
