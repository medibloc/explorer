import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import DetailWrapper from '../DetailWrapper';
import { bpMapper } from '../../lib';
import { BlockchainActions, WidgetActions as w } from '../../redux/actionCreators';
import PageInfo from '../PageInfo';


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

    w.loader(
      BlockchainActions
        .getBP(candidateId),
    );
  }

  render() {
    const {
      bp, address, language, mode,
    } = this.props;
    return (bp && bp.address === address) && (
      <Fragment>
        <PageInfo title="bp-detail" />
        <DetailWrapper
          data={bpMapper(bp)}
          lang={language}
          mode={mode}
          type="bp"
        />
      </Fragment>
    );
  }
}

BP.propTypes = {
  bp: PropTypes.object,
  account: PropTypes.object,
  address: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
};

BP.defaultProps = {
  account: null,
  bp: null,
};

export default BP;
