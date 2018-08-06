import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ContentWrapper from '../ContentWrapper';
import { BlockchainActions } from '../../redux/actionCreators';


const titles = ['Account', 'Balance', 'Percentage', 'Transactions'];

class Accounts extends Component {
  componentWillMount() {
    BlockchainActions.getAccounts();
  }

  render() {
    const { data } = this.props;
    return (
      <div className="accounts">
        {
          data.map(acc => (
            <ContentWrapper
              type="account"
              data={acc}
              titles={titles}
              key={acc.Account}
            />
          ))
        }
      </div>
    );
  }
}

Accounts.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Accounts;
