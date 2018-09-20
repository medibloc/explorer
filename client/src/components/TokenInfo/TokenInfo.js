import cx from 'classnames';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import LiveTickerWrapper from '../LiveTickerWrapper';

import './tokenInfo.scss';


const TokenInfo = ({ intl, mode }) => {
  return (
    <div className={cx('tokenInfo', { mobile: mode === 2 })}>
      <div className="bg" />
      <LiveTickerWrapper
        title={intl.formatMessage({ id: 'medPrice' })}
        suffix="USD"
      />
      <div className="verticalLine" />
      <LiveTickerWrapper
        title={intl.formatMessage({ id: 'medSupply' })}
        suffix="MED"
      />
    </div>
  );
};

TokenInfo.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(TokenInfo);
