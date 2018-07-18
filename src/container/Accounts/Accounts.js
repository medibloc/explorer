import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContentBox from '../../components/ContentBox';
import ContentWrapper from '../../components/ContentWrapper';
import { BlockchainActions } from '../../redux/actionCreators';


const titles = ['Account', 'Balance', 'Percentage', 'Transactions'];

class Accounts extends Component {
  componentWillMount() {
    BlockchainActions.getAccounts();
  }

  render() {
    const { accounts, loading, data } = this.props;


    return loading ? (
      <div>
        LOADING
      </div>)
      : (
        <div className="accounts">
          {
            data.map((acc, i) => (
              <ContentWrapper
                type="account"
                data={acc}
                titles={titles}
                key={i}
              />
            ))
          }
        </div>
      );
  }
}


const mapStateToProps = ({ blockchain, widget }) => ({
  accounts: blockchain.accounts,
  loading: widget.loading,
});

export default connect(mapStateToProps)(Accounts);
