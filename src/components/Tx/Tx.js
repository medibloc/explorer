import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DetailWrapper from '../DetailWrapper';
import { txMapper } from '../../lib';
import { BlockchainActions, WidgetActions as w } from '../../redux/actionCreators';


class Tx extends Component {
  componentWillMount() {
    const { hash } = this.props;
    w.loader(BlockchainActions.getTx(hash));
  }

  render() {
    const { tx } = this.props;
    return tx && (
      <DetailWrapper data={txMapper(tx)} type="tx" />
    );
  }
}

Tx.propTypes = {
  hash: PropTypes.string.isRequired,
  tx: PropTypes.object,
};

Tx.defaultProps = {
  tx: null,
};

export default Tx;
