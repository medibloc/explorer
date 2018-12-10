import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DetailWrapper from '../DetailWrapper';
import { bpMapper } from '../../lib';
import { BlockchainActions, WidgetActions as w } from '../../redux/actionCreators';


class BP extends Component {
  constructor(props) {
    super(props);
    this.callBP = this.callBP.bind(this);
  }

  componentDidMount() {
    this.callBP();
  }

  shouldComponentUpdate(nextProps) {
    const {
      bp, address, account, language,
    } = this.props;
    if (account !== nextProps.account && nextProps.account.address === address) {
      this.callBP(nextProps);
      return true;
    }
    if (bp !== nextProps.bp) return true;
    if (language !== nextProps.language) return true;
    return false;
  }

  callBP(nextProps) {
    let { account, address } = this.props;
    if (nextProps) {
      ({ account, address } = nextProps);
    }
    if (account === null || account.address !== address) return;

    const { candidateId } = account;
    if (!candidateId || candidateId.length !== 64) return;

    w.loader(BlockchainActions
      .getBP(candidateId));
  }

  render() {
    const { bp } = this.props;
    return bp && (
      <DetailWrapper data={bpMapper(bp)} type="bp" />
    );
  }
}

BP.propTypes = {
  bp: PropTypes.object,
  account: PropTypes.object,
  address: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

BP.defaultProps = {
  account: null,
  bp: null,
};

export default BP;
